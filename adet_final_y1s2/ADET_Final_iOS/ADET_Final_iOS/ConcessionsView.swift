import SwiftUI

struct ConcessionsView: View {
    @Binding var menuOpen: Bool
    @Binding var destination: AppDestination

    @State private var items: [ConcessionItem] = []
    @State private var loading = true

    // Desired display order for categories
    private let categoryOrder = ["Popcorn", "Snacks", "Drinks", "A La Carte"]

    // Group items by category and sort them using the desired order
    var grouped: [(String, [ConcessionItem])] {
        // Build a dictionary: category -> [items]
        let dict = Dictionary(grouping: items, by: { $0.category })
        // Walk categories in our preferred order and pick available ones
        let ordered = categoryOrder.compactMap { cat -> (String, [ConcessionItem])? in
            guard let arr = dict[cat] else { return nil }
            // Sort items within a category by their displayOrder (fallback to 0)
            return (cat, arr.sorted { ($0.displayOrder ?? 0) < ($1.displayOrder ?? 0) })
        }
        return ordered
    }

    var body: some View {
        VStack(spacing: 0) {
            HeaderBar(menuOpen: $menuOpen)
            ScrollView {
                VStack(spacing: 18) {
                    // Show a spinner while data is loading
                    if loading {
                        ProgressView()
                            .padding(.top, 40)
                    } else {
                        Image("MM_LoginPictureFull")
                            .resizable()
                            .scaledToFit()
                            .frame(maxWidth: 240)
                            .cornerRadius(6)
                        Text("Concessions\nInformation")
                            .multilineTextAlignment(.center)
                            .font(.system(size: 26, weight: .regular))
                            .foregroundColor(.black)
                            .padding(.top, 8)

                        ForEach(grouped, id: \.0) { category, list in
                            VStack(alignment: .leading, spacing: 8) {
                                Text(category)
                                    .font(.system(size: 16, weight: .bold))
                                    .foregroundColor(Color(red: 0.10, green: 0.16, blue: 0.29))
                                ForEach(list) { item in
                                    HStack {
                                        Text(item.name)
                                            .font(.system(size: 14))
                                            .foregroundColor(.black)
                                        Spacer()
                                        Text("$\(item.price)")
                                            .font(.system(size: 14, weight: .medium))
                                            .foregroundColor(.black)
                                    }
                                }
                            }
                            .padding(.horizontal, 24)
                        }
                    }
                }
                .padding(.bottom, 30)
            }
        }
        .background(Color.white)
        .task { await load() } // The initial load when the view appears
    }

    // Fetch concessions from the API and update local state
    private func load() async {
        loading = true
        do {
            // Make the network call; if it fails, fall back to an empty list
            items = try await APIClient.shared.fetchConcessions()
        } catch {
            items = []
        }
        loading = false
    }
}
