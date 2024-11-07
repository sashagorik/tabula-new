const calculateTimeLeft = (targetHour, useSeconds) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);
  
    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }
  
    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff / 1000) % 60);
  
    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
  
    return useSeconds
      ? `${paddedHours}:${paddedMinutes}:${seconds}`
      : `${paddedHours}:${paddedMinutes}`;
  };
  
  export default calculateTimeLeft;