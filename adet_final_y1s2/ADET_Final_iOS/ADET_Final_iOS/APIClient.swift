//
//  APIClient.swift
//  ADET_Final_iOS
//
//  Created by Harlan Tasci on 5/13/26.
//

import Foundation

enum APIError: Error { case badURL, badResponse, decode(Error) }

final class APIClient {
    static let shared = APIClient()
    private let baseURL = "http://localhost:3001"

    func fetchMovies() async throws -> [Movie] {
        guard let url = URL(string: "\(baseURL)/movies") else { throw APIError.badURL }
        let (data, response) = try await URLSession.shared.data(from: url)
        guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
            throw APIError.badResponse
        }
        do {
            return try JSONDecoder().decode([Movie].self, from: data)
        } catch {
            throw APIError.decode(error)
        }
    }

    func fetchConcessions() async throws -> [ConcessionItem] {
        guard let url = URL(string: "\(baseURL)/concessions") else { throw APIError.badURL }
        let (data, response) = try await URLSession.shared.data(from: url)
        guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
            throw APIError.badResponse
        }
        do {
            return try JSONDecoder().decode([ConcessionItem].self, from: data)
        } catch {
            throw APIError.decode(error)
        }
    }
}

// Convert "/assets/foo.png" served from your backend's neighbor (Next.js) to a full URL.
// Assume the Next.js host is the same machine on port 3000 since that's where images live.
extension String {
    func absoluteImageURL() -> URL? {
        if self.hasPrefix("http") { return URL(string: self) }
        return URL(string: "http://localhost:3000\(self)")
    }
}
