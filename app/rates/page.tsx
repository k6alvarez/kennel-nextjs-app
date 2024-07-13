import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import BoardingRates from "@/components/boarding/BoardingRates";
import ContentItem from "@/components/content/ContentItem";
import { Content } from "@/components/ui/Content";
import { Card, Tag } from "antd";
import { DateTime } from "luxon";

export const generateMetadata = async () => {
  try {
    const session = await auth();
    return {
      title: `Rates`,
      description: `Welcome to the rates page`,
    };
  } catch (e) {
    return {
      title: `Rates`,
      description: `Welcome to the rates page`,
    };
  }
};

export default async function RatesPage() {
  const holidayPremiumDates = await prisma?.holidayPremiumDates.findMany({
    orderBy: {
      dateFrom: "asc",
    },
  });
  return (
    <Content>
      <ContentItem page="RATES" section="MAIN" name="ratesContent" />
      <BoardingRates />
      <ContentItem page="RATES" section="MAIN" name="ratesHolidayContent" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {holidayPremiumDates &&
          holidayPremiumDates.length > 0 &&
          holidayPremiumDates.map((date) => (
            <Card
              style={{
                backgroundColor: "rgba(var(--secondary), 0.5)",
              }}
              key={date.id}
            >
              <div className="flex flex-col items-center py-4 gap-2">
                <div className="flex justify-center font-medium text-sm">
                  {date.name}
                </div>
                <Tag color={date.type === "Premium" ? "blue" : "green"}>
                  {date.type} {date.type === "Premium" ? "Dates" : "Date"}
                </Tag>
                <div className="font-bold">
                  {date.dateTo ? (
                    <>
                      {DateTime.fromISO(date.dateFrom).toLocaleString(
                        DateTime.DATE_MED
                      )}
                      {" - "}
                      {DateTime.fromISO(date.dateTo).toLocaleString(
                        DateTime.DATE_MED
                      )}
                    </>
                  ) : (
                    <>
                      {DateTime.fromISO(date.dateFrom).toLocaleString(
                        DateTime.DATE_FULL
                      )}
                    </>
                  )}
                </div>
                {date.isClosed && <div>Closed</div>}
                {date.timeOpen && (
                  <div>
                    <span>
                      Limited Hours:{" "}
                      {DateTime.fromISO(date.timeOpen as string).toLocaleString(
                        DateTime.TIME_SIMPLE
                      )}{" "}
                      -{" "}
                      {DateTime.fromISO(
                        date.timeClose as string
                      ).toLocaleString(DateTime.TIME_SIMPLE)}
                    </span>
                  </div>
                )}
                {date.breakOpen && (
                  <div>
                    <span>
                      {DateTime.fromISO(
                        date.breakClose as string
                      ).toLocaleString(DateTime.TIME_SIMPLE)}
                    </span>
                    <span>
                      {DateTime.fromISO(
                        date.breakOpen as string
                      ).toLocaleString(DateTime.TIME_SIMPLE)}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
      </div>

      <ContentItem page="RATES" section="MAIN" name="ratesDiscountContent" />

      <ContentItem page="RATES" section="MAIN" name="ratesAdditionalContent" />
    </Content>
  );
}
