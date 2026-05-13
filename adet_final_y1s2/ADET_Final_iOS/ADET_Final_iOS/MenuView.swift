import SwiftUI

enum AppDestination {
    case home, concessions
}

struct MenuView: View {
    @Binding var isOpen: Bool
    @Binding var destination: AppDestination

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .topLeading) {
                Color.black.opacity(0.35)
                    .ignoresSafeArea()
                    .onTapGesture { withAnimation { isOpen = false } }

                VStack(spacing: 20) {
                    MenuButton(label: "Home") {
                        destination = .home
                        withAnimation { isOpen = false }
                    }
                    MenuButton(label: "Concessions") {
                        destination = .concessions
                        withAnimation { isOpen = false }
                    }
                    MenuButton(label: "Our Website") {
                        if let url = URL(string: "http://localhost:3000") {
                            UIApplication.shared.open(url)
                        }
                    }
                    Spacer()
                }
                .padding(.top, 80)
                .padding(.horizontal, 32)
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
                .background(Color(white: 0.92).ignoresSafeArea())
                .frame(width: geo.size.width * 0.75)
            }
        }
    }
}



/// (MenuView.swift) and isn't intended to be used from other files. Keeping it private
/// limits its visibility to this file and helps maintain a clean public API surface.


private struct MenuButton: View {
    let label: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .tracking(4)
                .font(.system(size: 16, weight: .regular))
                .foregroundColor(.black)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(
                    RoundedRectangle(cornerRadius: 4)
                        .stroke(Color.black.opacity(0.6), lineWidth: 1)
                )
        }
    }
}
