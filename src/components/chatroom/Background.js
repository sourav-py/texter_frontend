import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBottleDroplet, faCab, faCoffee, faIceCream, faMessage } from '@fortawesome/free-solid-svg-icons'; // Import any icon you want to use

const BackgroundComponent = () => {
  // Generate an array of JSX elements representing the grid cells with icons
  const renderGridCells = () => {
    
    const icons = [faCoffee, faBook, faMessage, faIceCream, faBottleDroplet, faCab]
    const gridSize = 12; // Adjust the grid size as needed
    const gridCells = [];

    for (let i = 0; i < gridSize * gridSize; i++) {
      gridCells.push(
        <div key={i} className="grid-cell">
          <FontAwesomeIcon className="text-lg text-white" icon={icons[Math.floor(Math.random()*10)%(icons.length)]} /> {/* Change the icon here */}
        </div>
      );
    }

    return gridCells;
  };

  return (
        <>
            {renderGridCells()}
        </>
  );
};

export default BackgroundComponent;
