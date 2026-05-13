import SwiftUI

struct MoviesListView: View {
    @State private var movies: [Movie] = []
    @State private var loading = true
    @State private var error: String?
    @State private var menuOpen = false
    @State private var destination: AppDestination = .home

    private let columns = [GridItem(.flexible(), spacing: 16), GridItem(.flexible(), spacing: 16)]

    var body: some View {
        NavigationStack {
            ZStack(alignment: .topLeading) {
                // Switch between the movies list and the concessions screen based on destination
                Group {
                    if destination == .concessions {
                        ConcessionsView(menuOpen: $menuOpen, destination: $destination)
                    } else {
                        moviesContent
                    }
                }

              
                if menuOpen {
                    MenuView(isOpen: $menuOpen, destination: $destination)
                        .transition(.move(edge: .leading))
                }
            }
         
            .navigationBarHidden(true)
        }
        .task { await load() } // Load movies when the view appears
    }

    // Fetch the list of movies asynchronously and update view state
    private func load() async {
        loading = true
        error = nil
        // Try to load from the API; on failure, set a user-friendly error message
        do {
            movies = try await APIClient.shared.fetchMovies()
        } catch {
            self.error = "Failed to load movies. Make sure the backend is running."
        }
        loading = false
    }

    private var moviesContent: some View {
        VStack(spacing: 0) {
            HeaderBar(menuOpen: $menuOpen)

            // Loading state
            if loading {
                Spacer()
                ProgressView("Loading movies...")
                Spacer()
            }
            // Error state with retry
            else if let error {
                Spacer()
                Text(error).foregroundColor(.red).padding()
                Button("Retry") { Task { await load() } }
                Spacer()
            }
            // Loaded state: grid of movie cards
            else {
                ScrollView {
                    LazyVGrid(columns: columns, spacing: 16) {
                        ForEach(movies) { movie in
                            NavigationLink(destination: MovieDetailView(movie: movie)) {
                                MovieCardView(movie: movie)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(16)
                }
            }
        }
        .background(Color.white)
    }
}

struct HeaderBar: View {
    @Binding var menuOpen: Bool

    var body: some View {
        HStack {
            Image("AppLogo")
                .resizable()
                .scaledToFit()
                .frame(width: 56, height: 56)
            Spacer()
            Button { withAnimation { menuOpen.toggle() } } label: {
                Image(systemName: "line.3.horizontal")
                    .font(.system(size: 24, weight: .light))
                    .foregroundColor(.black)
            }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 12)
        .background(Color.white)
    }
}

struct MovieCardView: View {
    let movie: Movie

    var body: some View {
        VStack(spacing: 0) {
            // Load poster image; show gray placeholder while loading or on failure
            AsyncImage(url: movie.image?.absoluteImageURL()) { phase in
                switch phase {
                case .success(let img):
                    img.resizable().scaledToFill()
                default:
                    Rectangle().fill(Color(white: 0.85))
                }
            }
            .frame(height: 200)
            .clipped()

            VStack(spacing: 8) {
                Text(movie.title)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.black)
                    .lineLimit(1)
                Text("View More")
                    .font(.system(size: 12))
                    .foregroundColor(.black)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 4)
                    .overlay(
                        RoundedRectangle(cornerRadius: 4)
                            .stroke(Color.black.opacity(0.4), lineWidth: 1)
                    )
            }
            .padding(.vertical, 10)
            .frame(maxWidth: .infinity)
            .background(Color(white: 0.93))
        }
        .clipShape(RoundedRectangle(cornerRadius: 10))
    }
}
