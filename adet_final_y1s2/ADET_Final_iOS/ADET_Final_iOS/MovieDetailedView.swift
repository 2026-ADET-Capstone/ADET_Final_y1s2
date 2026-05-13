import SwiftUI

struct MovieDetailView: View {
    let movie: Movie
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                HStack {
                    Image("AppLogo")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 56, height: 56)
                    Spacer()
                    Button(action: { dismiss() }) {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 20, weight: .light))
                            .foregroundColor(.black)
                    }
                }
                .padding(.horizontal, 20)

                AsyncImage(url: movie.image?.absoluteImageURL()) { phase in
                    switch phase {
                    case .success(let img):
                        img.resizable().scaledToFit()
                    default:
                        Rectangle().fill(Color(white: 0.85)).frame(height: 320)
                    }
                }
                .frame(maxWidth: 240)
                .cornerRadius(6)

                Text(movie.title)
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(.black)
                Text("Orion Axis Pictures")
                    .font(.footnote)
                    .foregroundColor(.gray)

                HStack(spacing: 12) {
                    Pill(text: movie.rating)
                    Pill(text: movie.runtime)
                }

                VStack(spacing: 2) {
                    Text("Shows At...")
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(.black)
                    Text("Today @ 5:30 pm (\(movie.runtime))")
                        .font(.footnote)
                        .foregroundColor(.gray)
                }
                .padding(.top, 4)

                Text(movie.description)
                    .font(.system(size: 14))
                    .foregroundColor(.black.opacity(0.85))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 24)
                    .padding(.top, 8)

                Spacer(minLength: 20)
            }
            .padding(.top, 8)
        }
        .background(Color.white)
        .navigationBarHidden(true)
    }
}

private struct Pill: View {
    let text: String
    var body: some View {
        Text(text)
            .font(.system(size: 13, weight: .medium))
            .foregroundColor(.black)
            .padding(.horizontal, 14)
            .padding(.vertical, 6)
            .overlay(
                Capsule().stroke(Color.black.opacity(0.4), lineWidth: 1)
            )
    }
}
