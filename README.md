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
- **Commit Duration**: 3.4ms (reduced by ~69.16%).
- **Render Duration**: `CountriesList` took 2.3ms of 3.3ms.
- **Interactions**: Sorting triggered fewer renders due to memoization.
- **Flame Graph**: Reduced render time for `CountriesList` and its child components.
- **Ranked Chart**: `CountryCard` render time significantly reduced due to `React.memo`.

![alt text](<public/2025-03-23 203957.png>)
![alt text](<public/2025-03-23 204110.png>)

### Performance Observations
- The use of `React.memo` reduced unnecessary re-renders of `CountryCard`.
- The use of `useMemo` optimized the filtering logic, reducing computation time.
- Overall render time decreased by ~69.16%.