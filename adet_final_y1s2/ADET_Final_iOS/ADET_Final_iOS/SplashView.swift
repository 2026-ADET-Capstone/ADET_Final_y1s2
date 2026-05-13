import SwiftUI

public struct SplashView: View {
    public init() {}
    
    public var body: some View {
        ZStack {
            Color(.systemBackground)
                .ignoresSafeArea()
            VStack(spacing: 16) {
                Text("ADET Final")
                    .font(.largeTitle).bold()
                ProgressView()
            }
            .padding()
        }
    }
}

#Preview {
    SplashView()
}
