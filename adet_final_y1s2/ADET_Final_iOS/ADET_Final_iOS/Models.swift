//
//  Models.swift
//  ADET_Final_iOS
//
//  Created by Harlan Tasci on 5/13/26.
//

import Foundation

struct Movie: Identifiable, Decodable {
    let id: Int
    let title: String
    let genre: String
    let rating: String
    let runtime: String
    let releaseDate: String?
    let description: String
    let image: String?
}

struct ConcessionItem: Identifiable, Decodable {
    let id: Int
    let category: String
    let name: String
    let price: String
    let displayOrder: Int?
}
