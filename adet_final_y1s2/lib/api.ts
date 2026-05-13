const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  runtime: string;
  releaseDate: string;
  description: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const movieAPI = {
  async getAllMovies(): Promise<Movie[]> {
    try {
      const res = await fetch(`${API_URL}/movies`);
      if (!res.ok) throw new Error('Failed to fetch movies');
      return res.json();
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  },

  async getMovieById(id: number): Promise<Movie | null> {
    try {
      const res = await fetch(`${API_URL}/movies/${id}`);
      if (!res.ok) throw new Error('Failed to fetch movie');
      return res.json();
    } catch (error) {
      console.error('Error fetching movie:', error);
      return null;
    }
  },

  async createMovie(movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie | null> {
    try {
      const res = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
      });
      if (!res.ok) throw new Error('Failed to create movie');
      return res.json();
    } catch (error) {
      console.error('Error creating movie:', error);
      return null;
    }
  },

  async updateMovie(id: number, movie: Partial<Movie>): Promise<Movie | null> {
    try {
      const res = await fetch(`${API_URL}/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
      });
      if (!res.ok) throw new Error('Failed to update movie');
      return res.json();
    } catch (error) {
      console.error('Error updating movie:', error);
      return null;
    }
  },

  async deleteMovie(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${API_URL}/movies/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete movie');
      return true;
    } catch (error) {
      console.error('Error deleting movie:', error);
      return false;
    }
  },
};

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  displayOrder?: number;
}

export const staffAPI = {
  async getAll(): Promise<StaffMember[]> {
    try {
      const res = await fetch(`${API_URL}/staff`);
      if (!res.ok) throw new Error('Failed to fetch staff');
      return res.json();
    } catch (err) {
      console.error('Error fetching staff:', err);
      return [];
    }
  },
};

export interface ConcessionItem {
  id: number;
  category: string;
  name: string;
  price: number | string;
  displayOrder?: number;
}

export const concessionsAPI = {
  async getAll(): Promise<ConcessionItem[]> {
    try {
      const res = await fetch(`${API_URL}/concessions`);
      if (!res.ok) throw new Error('Failed to fetch concessions');
      return res.json();
    } catch (err) {
      console.error('Error fetching concessions:', err);
      return [];
    }
  },
};