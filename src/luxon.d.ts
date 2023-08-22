declare module 'luxon' {
    interface DateTime {
      // Add any additional methods or properties you want to extend
    }
  
    const DateTime: {
      fromJSDate(jsDate: Date, options?: { zone?: string }): DateTime;
      // Add other static methods here
    };
  
    // Add other types and interfaces if needed
  }