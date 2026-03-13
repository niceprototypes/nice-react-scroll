# Performance Testing

This directory contains performance testing tools to evaluate and compare different implementation approaches for nice-react-scroll.

## Available Tests

### 1. StickyPerformanceTest.tsx

**Purpose:** Side-by-side comparison of scroll-based vs IntersectionObserver sticky detection.

**What it tests:**
- Number of component renders
- Number of scroll event handlers called
- State change frequency
- Average frame processing time
- Total CPU time

**How to use:**
1. Import and render the component in your test app
2. Scroll up and down the page manually
3. Observe the real-time metrics on both columns
4. Compare the numbers to see which approach is more efficient

**Expected results:**
- IntersectionObserver should have:
  - **Fewer scroll events** (0 vs many)
  - **Similar or fewer renders**
  - **Lower average frame time**
  - **Better FPS during scroll**

```tsx
import StickyPerformanceTest from './tests/performance/StickyPerformanceTest'

function App() {
  return <StickyPerformanceTest />
}
```

### 2. PerformanceBenchmark.tsx

**Purpose:** Automated benchmark that simulates user scrolling and measures performance.

**What it tests:**
- Automated scroll simulation over 3 seconds
- Quantified performance metrics
- Statistical comparison with percentage differences
- Winner highlighting

**How to use:**
1. Import and render the component
2. Click "Run Benchmark"
3. Wait for the automated test to complete
4. Review the results table

**Reading the results:**
- ✓ Green checkmarks indicate the winning approach for each metric
- Percentage shows how much better the winner performed
- Lower is better for: Frame time, CPU time, Renders, Scroll events
- Higher is better for: FPS

```tsx
import PerformanceBenchmark from './tests/performance/PerformanceBenchmark'

function App() {
  return <PerformanceBenchmark />
}
```

## Testing Methodology

### Manual Testing (StickyPerformanceTest)

**Benefits:**
- Real user interaction
- Visual feedback
- Easy to understand

**Steps:**
1. Scroll slowly - observe metrics update
2. Scroll quickly - check for frame drops
3. Scroll to specific points - verify sticky state accuracy
4. Compare final numbers after 1 minute of scrolling

### Automated Testing (PerformanceBenchmark)

**Benefits:**
- Consistent test conditions
- Reproducible results
- Quantified comparisons

**Steps:**
1. Run benchmark multiple times
2. Average the results
3. Look for consistent patterns
4. Identify clear winners

## Using Chrome DevTools

For the most accurate performance analysis, use Chrome's Performance Profiler:

### Recording a Performance Profile

1. **Open DevTools**: Press F12 or right-click → Inspect
2. **Go to Performance tab**
3. **Start recording**: Click the record button (●)
4. **Perform action**: Scroll the page or run the benchmark
5. **Stop recording**: Click stop (■)

### What to Look For

#### In the Timeline:
- **Yellow bars** = JavaScript execution (scripting)
- **Purple bars** = Layout and paint (rendering)
- **Green bars** = Painting
- **Red triangles** = Long tasks (> 50ms)

#### Key Metrics:
- **FPS graph**: Should stay at 60 FPS (green line)
  - Drops below indicate jank/stuttering
- **CPU usage**: Lower is better
- **Main thread activity**: Less is better during scroll

#### Specific Checks:

**For Scroll-based approach:**
```
Look for:
- Many "scroll" event calls
- Frequent "getBoundingClientRect" calls
- State updates every frame
- Higher scripting time
```

**For IntersectionObserver approach:**
```
Look for:
- Fewer or no scroll events
- IntersectionObserver callbacks only when needed
- Less frequent state updates
- Lower scripting time
```

### Comparing Results

**Scroll-based (Current):**
```
Expected pattern:
scroll → RAF → getBoundingClientRect → calculate → setState → render
(Happens on EVERY scroll event)
```

**IntersectionObserver (Proposed):**
```
Expected pattern:
IntersectionObserver callback → setState → render
(Happens only when threshold crossed)
```

## Interpreting Results

### When IntersectionObserver is Better:
- ✅ Significantly fewer renders during scroll
- ✅ No scroll event overhead
- ✅ Better FPS during continuous scrolling
- ✅ Lower CPU usage overall
- ✅ Runs off main thread

### When Scroll-based Might Be Better:
- ✅ More immediate updates (less latency)
- ✅ Simpler mental model
- ✅ Better browser support (though IO is widely supported now)

### Real-World Impact

**Small difference (< 10%)**: Probably not worth changing
**Medium difference (10-30%)**: Worth considering for apps with many sticky elements
**Large difference (> 30%)**: Strong case for switching

## Example Test Results

Based on typical testing, you might see:

```
Metric                  | Scroll-based | IntersectionObserver | Winner
------------------------|--------------|----------------------|--------
Scroll Events           | 500          | 0                    | IO ✓
Component Renders       | 250          | 15                   | IO ✓
State Changes           | 20           | 4                    | IO ✓
Avg Frame Time          | 3.2ms        | 1.8ms                | IO ✓
FPS                     | 58.5         | 59.8                 | IO ✓
CPU Time                | 850ms        | 320ms                | IO ✓
```

This would represent a **~60% performance improvement**.

## Running Tests in Different Scenarios

### Test Scenario 1: Few Sticky Elements (1-2)
Expected: Minimal difference between approaches

### Test Scenario 2: Many Sticky Elements (5+)
Expected: Significant advantage for IntersectionObserver

### Test Scenario 3: Mobile Device
Expected: Even bigger advantage for IntersectionObserver due to limited CPU

### Test Scenario 4: Slow CPU Throttling
In Chrome DevTools:
1. Open Performance tab
2. Click gear icon
3. Set CPU throttling to "6x slowdown"
4. Run tests again

Expected: Performance differences amplified

## Next Steps

After running these tests:

1. **Document results**: Note the specific numbers you observe
2. **Test on real devices**: Mobile phones, tablets, older computers
3. **Test with real content**: Add your actual app content to the test
4. **Decide**: If IntersectionObserver shows clear wins, implement it
5. **Benchmark again**: After implementing, verify the improvements

## Contributing Test Results

If you run these tests and get interesting results, please share them by:
1. Opening an issue with your findings
2. Including screenshots from DevTools
3. Noting your test environment (browser, OS, device)
4. Sharing your use case (number of sticky elements, etc.)

This helps the community make informed decisions about performance optimizations!