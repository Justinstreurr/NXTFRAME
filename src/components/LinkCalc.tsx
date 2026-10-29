"use client";

import { Frame } from "./LinkFlow";
import { useStep, WidgetCalculator } from "./SmartBento";

/**
 * The calculator picture for Koppelingen on /financieel-advies: the glass calculator widget of the
 * homepage's Meer dan een website (WidgetCalculator), with the results of a calculation popping up
 * around it on the bento's clock, on the same faint grid as the other link pictures.
 */
export function LinkCalc() {
  const { host, step } = useStep();
  return (
    <div ref={host}>
      <Frame tone="wine">
        <div className="absolute left-1/2 top-[45%] w-[210px] -translate-x-1/2 -translate-y-1/2 md:w-[240px]">
          <WidgetCalculator step={step} />
        </div>
      </Frame>
    </div>
  );
}
