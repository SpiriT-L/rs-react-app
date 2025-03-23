## Profiling Results (Before and After Optimization)

### Before Optimization
- **Commit Duration**: 10.7ms.
- **Render Duration**: `CountriesList` took 4.9ms of 10.7ms.
- **Interactions**: Sorting triggered the render.
- **Flame Graph**: Most of the time was spent rendering the `CountriesList` component.
- **Ranked Chart**: `CountriesList` was the most time-consuming component.

![alt text](<public/2025-03-23 011520.png>)
![alt text](<public/2025-03-23 012004.png>)

### After Optimization
- **Commit Duration**: 1.7ms (reduced by ~73.83%).
- **Render Duration**: `CountriesList` took 1.9ms of 2.8ms.
- **Interactions**: Sorting triggered fewer renders due to memoization.
- **Flame Graph**: Reduced render time for `CountriesList` and its child components.
- **Ranked Chart**: `CountryCard` render time significantly reduced due to `React.memo`.

![alt text](<public/2025-03-23 022323.png>)
![alt text](<public/2025-03-23 022432.png>)

### Performance Observations
- The use of `React.memo` reduced unnecessary re-renders of `CountryCard`.
- The use of `useMemo` optimized the filtering logic, reducing computation time.
- Overall render time decreased by ~73.83%.