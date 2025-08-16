// Common CSS classes for consistent styling
export const COMMON_STYLES = {
  card: {
    base: 'bg-gray-900/50 border-gray-800 hover:bg-gray-800/30 cursor-pointer transition-all duration-200',
    content: 'p-4',
  },
  badge: {
    score: {
      high: 'bg-green-900/20 text-green-400 border-green-800/30',
      medium: 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30',
      low: 'bg-red-900/20 text-red-400 border-red-800/30',
    },
    status: {
      new: 'bg-blue-900/20 text-blue-400 border-blue-800/30',
      contacted: 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30',
      qualified: 'bg-green-900/20 text-green-400 border-green-800/30',
      disqualified: 'bg-red-900/20 text-red-400 border-red-800/30',
    },
  },
  table: {
    header: 'bg-gray-800/80 border-b border-gray-700',
    row: 'hover:bg-gray-800/30 cursor-pointer transition-colors duration-150 border-b border-gray-800/50',
  },
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  fast: 'duration-150',
  normal: 'duration-200',
  slow: 'duration-300',
} as const;
