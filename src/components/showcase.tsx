import { CardsActivityGoal } from "./showcase-components/activity-goal"
import { ButtonsDiv } from "./showcase-components/buttonsdiv"
import { CardsCalendar } from "./showcase-components/calendar"
import { CardsChat } from "./showcase-components/chat"
import { CardsCookieSettings } from "./showcase-components/cookie-settings"
import { CardsCreateAccount } from "./showcase-components/create-account"
import { CardsMetric } from "./showcase-components/metric"
import { CardsPaymentMethod } from "./showcase-components/payment-method"
import { CardsShare } from "./showcase-components/share"

export default function Showcase() {
  return (
    <>
    <div className="mb-4 md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4">
      <div className="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
        <div className="grid gap-1 sm:grid-cols-[260px_1fr] md:hidden mt-4">
          <CardsCalendar />
          <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
            <CardsActivityGoal />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="space-y-4 xl:space-y-4">
            <CardsCookieSettings />
            <CardsPaymentMethod />
          </div>
          <div className="space-y-4 xl:space-y-4">
            <CardsChat />
            <CardsCreateAccount />
            <ButtonsDiv />
          </div>
        </div>
      </div>
      <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4 mt-4">
        <div className="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
          <CardsCalendar />
          <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
            <CardsActivityGoal />
          </div>
        </div>
        <CardsShare />
        <CardsMetric />
      </div>
    </div>
    </>
  )
}