
// Utility functions for handling timestamp display
export const generateRealisticTimestamp = (): Date => {
  const now = new Date();
  // Generate a timestamp between 1-6 hours ago to make it feel realistic
  const hoursAgo = Math.floor(Math.random() * 5) + 1;
  return new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000));
};

export const formatRelativeTime = (timestamp: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }
  
  // For older timestamps, show absolute time
  return `Today at ${timestamp.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })}`;
};
