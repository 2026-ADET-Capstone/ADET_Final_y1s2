import SwiftUI

struct SplashView: View {
    @State private var isActive = false

    var body: some View {
        if isActive {
            MoviesListView()
        } else {
            VStack(spacing: 24) {
                Spacer()
                Image("AppLogo")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 260, height: 260)
                Text("Moonlight\nMotion")
                    .multilineTextAlignment(.center)
                    .font(.system(size: 32, weight: .light))
                    .tracking(8)
                    .foregroundColor(Color(red: 0.10, green: 0.16, blue: 0.29))
                Spacer()
                Text("Created by: Harlan Tasci")
                    .font(.footnote)
                    .foregroundColor(.gray)
                    .padding(.bottom, 40)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color.white.ignoresSafeArea())
            .onAppear {
                DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
                    withAnimation { isActive = true }
                }
            }
        }
    }
}
