import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Gift, Crown, Star, Loader2 } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { rewardsService, LeaderboardUser } from '../services/rewardsService';

interface RewardsViewProps {
  onBack: () => void;
}

export function RewardsView({ onBack }: RewardsViewProps) {
  const { puntosImperiales } = useUserStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const data = await rewardsService.getLeaderboard(puntosImperiales);
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [puntosImperiales]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-7xl mx-auto px-4 py-6 pb-32"
    >
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-display font-bold text-white tracking-wide">
          Recompensas
        </h2>
      </div>

      {/* Grand Prize Banner */}
      <div className="bg-gradient-to-br from-imperial-gold/20 via-imperial-crimson/20 to-black border border-imperial-gold/40 rounded-3xl p-6 mb-8 relative overflow-hidden shadow-[0_10px_30px_rgba(242,183,5,0.2)]">
        <div className="absolute top-0 right-0 w-40 h-40 bg-imperial-gold/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-imperial-crimson/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-imperial-gold to-yellow-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(242,183,5,0.5)] border-2 border-white/20">
            <Trophy className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-xl font-display font-bold text-imperial-gold mb-2 drop-shadow-md">
            Gran Premio Anual
          </h3>
          <p className="text-white/90 font-medium mb-4 leading-relaxed">
            El cliente #1 en el Top Global al <span className="text-imperial-gold font-bold">31 de Diciembre</span> ganará un <span className="font-bold text-white">Arroz Sabor Chino</span> gratis.
          </p>
          <div className="inline-flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/10">
            <Gift className="w-4 h-4 text-imperial-gold" />
            <span className="text-xs text-white/80 uppercase tracking-wider font-bold">Retirable en restaurante</span>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
        <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GlobeIcon className="w-6 h-6 text-imperial-gold" />
            <h3 className="text-lg font-bold text-white tracking-wide">Top 10 Global</h3>
          </div>
          <span className="text-xs text-white/50 uppercase tracking-widest font-bold">Temporada 2026</span>
        </div>
        
        <div className="divide-y divide-white/5">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-imperial-gold animate-spin mb-4" />
              <p className="text-white/60 font-medium">Actualizando ranking global...</p>
            </div>
          ) : (
            leaderboard.map((user, index) => (
              <div 
                key={user.id} 
                className={`p-4 flex items-center justify-between transition-colors ${
                  user.isCurrentUser ? 'bg-imperial-gold/10 border-l-4 border-imperial-gold' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-imperial-gold text-black shadow-[0_0_10px_rgba(242,183,5,0.5)]' :
                    index === 1 ? 'bg-gray-300 text-black' :
                    index === 2 ? 'bg-amber-700 text-white' :
                    'bg-white/10 text-white/60'
                  }`}>
                    {index === 0 ? <Crown className="w-4 h-4" /> : 
                     index === 1 ? <Medal className="w-4 h-4" /> : 
                     index === 2 ? <Medal className="w-4 h-4" /> : 
                     index + 1}
                  </div>
                  <div>
                    <p className={`font-bold ${user.isCurrentUser ? 'text-imperial-gold' : 'text-white'}`}>
                      {user.name}
                    </p>
                    {user.isCurrentUser && (
                      <p className="text-[10px] text-imperial-gold/80 uppercase tracking-wider font-bold">Tu posición</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className={`w-4 h-4 ${index < 3 ? 'text-imperial-gold' : 'text-white/40'}`} />
                  <span className={`font-display font-bold ${index < 3 ? 'text-imperial-gold' : 'text-white/80'}`}>
                    {user.points.toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}
