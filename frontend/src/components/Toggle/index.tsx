import React, { useCallback, useState } from 'react';

export const Toggle: React.FC<{ onToggle?: () => void }> = ({ onToggle }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = useCallback(() => {
    setIsToggled(!isToggled);
    onToggle?.();
  }, [isToggled, onToggle]);

  return (
    <div className={`toggle ${isToggled ? 'active' : ''}`} onClick={handleToggle}>
      <div className={`toggle-slider ${isToggled ? 'active' : ''}`}></div>
    </div>
  );
};
