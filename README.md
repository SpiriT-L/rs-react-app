## Profiling Scenario
- Action: Sorting countries by name (A-Z).
- Tool: React Dev Tools Profiler.

## Profiling Parameters
1. Commit Duration: Time taken for React to render the committed updates.
   - Value: 10.7ms.
2. Render Duration: Time taken for individual components to render.
   - CountriesList: 4.9ms of 10.7ms.
3. Layout Effects: Time spent on layout effects.
   - Value: <0.1ms.
4. Passive Effects: Time spent on passive effects.
   - Value: <0.1ms.
5. Interactions: User interactions that triggered the renders.
   - Action: Sorting triggered the render.
6. Flame Graph: Visual representation of component render times.
   - Observation: Most of the time was spent rendering the *CountriesList* component.
7. Ranked Chart: Sorted list of components by render duration.
   - Observation: *CountriesList* was the most time-consuming component.

## Performance Observations
- The CountriesList component took 4.9ms of the total 10.7ms render time.
- Layout effects and passive effects were negligible (<0.1ms).
- Sorting triggered the render, and most of the time was spent rendering the list of countries.

#### **Screenshots**
1. **Flame Graph**  
   ![alt text](<public/2025-03-23 011520.png>)
   _Description: The graph shows that `CountriesList` is the primary component consuming render time._

2. **Ranked Chart**  
   ![alt text](<public/2025-03-23 012004.png>)
   _Description: The chart highlights `CountriesList` as the most time-consuming component._

---
