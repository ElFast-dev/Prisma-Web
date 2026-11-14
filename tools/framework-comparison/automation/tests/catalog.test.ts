import { describe, expect, it } from "vitest";
import { movies } from "../../shared/catalog";

describe("catálogo sintético compartido", () => {
  it("contiene exactamente 240 películas", () => {
    expect(movies).toHaveLength(240);
  });

  it("usa identificadores únicos y estables", () => {
    const ids = movies.map((movie) => movie.id);
    expect(new Set(ids).size).toBe(240);
    expect(ids).toEqual(Array.from({ length: 240 }, (_, index) => String(index + 1)));
  });

  it("mantiene los campos y rangos esperados", () => {
    for (const movie of movies) {
      expect(movie.title.trim().length).toBeGreaterThan(0);
      expect(movie.year).toBeGreaterThanOrEqual(1950);
      expect(movie.year).toBeLessThanOrEqual(2026);
      expect(movie.runtime).toBeGreaterThanOrEqual(82);
      expect(movie.runtime).toBeLessThanOrEqual(160);
      expect(movie.seed).toBeGreaterThanOrEqual(0);
      expect(movie.seed).toBeLessThanOrEqual(11);
      expect(["Vista", "Pendiente"]).toContain(movie.status);
    }
  });

  it("conserva los recuentos de referencia para los filtros", () => {
    expect(movies.filter((movie) => movie.status === "Pendiente")).toHaveLength(60);
    expect(movies.filter((movie) => movie.status === "Vista")).toHaveLength(180);
    expect(movies.filter((movie) => movie.genre === "Ciencia ficción")).toHaveLength(40);
    expect(movies.filter((movie) => movie.year === 1963)).toHaveLength(22);
  });
});
