// Bootstrap pattern to fix "eager consumption" error
import('./bootstrap')
  .catch(error => {
    console.error('Failed to load chat application:', error);
  });