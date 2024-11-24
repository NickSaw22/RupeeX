export const calculateNextRun = (frequency: any) =>{
    const now = new Date();

    switch(frequency){
        case 'Daily':
            return new Date(now.setDate(now.getDate()+1));
        case 'Weekly':
            return new Date(now.setDate(now.getDate()+7));
        case 'Monthly':
            return new Date(now.setMonth(now.getMonth()+1));
        case 'Yearly':
            return new Date(now.setFullYear(now.getFullYear()+1));
        default:
            return new Date(now.setFullYear(now.getFullYear()+1));
    }
};