export interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  isCurrentUser?: boolean;
}

// Base de datos simulada de otros usuarios
const MOCK_USERS: LeaderboardUser[] = [
  { id: '1', name: 'Carlos M.', points: 15420 },
  { id: '2', name: 'Ana L.', points: 14200 },
  { id: '3', name: 'Roberto G.', points: 12850 },
  { id: '5', name: 'María F.', points: 1100 },
  { id: '6', name: 'Juan P.', points: 950 },
  { id: '7', name: 'Elena R.', points: 820 },
  { id: '8', name: 'Diego S.', points: 740 },
  { id: '9', name: 'Laura V.', points: 610 },
  { id: '10', name: 'Miguel A.', points: 500 },
  { id: '11', name: 'Sofía T.', points: 450 },
  { id: '12', name: 'Pedro C.', points: 300 },
];

export const rewardsService = {
  /**
   * Obtiene el Top 10 global simulando una llamada a una API REST o Supabase.
   * Inserta al usuario actual en la lista para calcular su posición real.
   */
  async getLeaderboard(currentUserPoints: number, currentUserName: string = 'Tú'): Promise<LeaderboardUser[]> {
    // Simular latencia de red (800ms)
    await new Promise(resolve => setTimeout(resolve, 800));

    const currentUser: LeaderboardUser = {
      id: 'current-user',
      name: currentUserName,
      points: currentUserPoints,
      isCurrentUser: true,
    };

    // Combinar usuarios mockeados con el usuario actual
    const allUsers = [...MOCK_USERS, currentUser];

    // Ordenar por puntos de mayor a menor
    allUsers.sort((a, b) => b.points - a.points);

    // Devolver solo el Top 10
    return allUsers.slice(0, 10);
  }
};
