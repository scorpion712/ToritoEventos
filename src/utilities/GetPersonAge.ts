export const GetPersonAge = (bornDate: Date) => {
    if (bornDate) {
        const currentDate = new Date();
        
        // Calculate the person's age
        let age = currentDate.getFullYear() - bornDate.getFullYear();
        
        // Check if the person's birthday has occurred this year
        if (
          currentDate.getMonth() < bornDate.getMonth() ||
          (currentDate.getMonth() === bornDate.getMonth() && currentDate.getDate() < bornDate.getDate())
        ) {
          age--; // Subtract 1 year if the birthday hasn't occurred yet
        }
    
        return age;
    }
    return 0;
}