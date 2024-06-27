import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

import { ScrollArea } from "components/ui/scroll-area";
import { selectTimeZone } from "features/timezoneSlice";
import { StatusDot } from "components/base";
import { SheetContent, SheetHeader, SheetTitle } from "components/ui/sheet";
import { ErrorMetaData } from "types/Error";
import { GenerateSkeletons } from "shared/utils/generateSkeletons";
import { ErrorBarGraph } from "components/composite";

type AggregateErrorSheetProps = {
  errorMeta?: ErrorMetaData[];
};

const AggregateErrorSheet = ({ errorMeta }: AggregateErrorSheetProps) => {
  const navigate = useNavigate();
  const timezone = useSelector(selectTimeZone);

  const handleNavigateToErrorDetailPage = (id: string) => {
    navigate(`/error/${id}/console`);
  };

  return (
    <SheetContent aria-describedby="Error Data">
      <SheetHeader>
        <SheetTitle>Error Data</SheetTitle>
      </SheetHeader>
      <ScrollArea className="h-80 w-full rounded-md border">
        {errorMeta ? (
          errorMeta.map((error) => (
            <div
              className="text-2xs flex flex-row justify-around items-center"
              key={error.id}
            >
              <div
                key={error.id}
                className="flex flex-row space-x-4 py-1 items-center"
              >
                <p
                  onClick={() => {
                    handleNavigateToErrorDetailPage(error.id);
                  }}
                  className="hover:underline hover:decoration-default cursor-pointer"
                >
                  {error.id}
                </p>
                {error.resolved ? (
                  <StatusDot status={error.resolved} />
                ) : (
                  <StatusDot status={error.resolved} />
                )}
              </div>
              <p>
                {DateTime.fromISO(error.created_at)
                  .setZone(timezone)
                  .toFormat("MM-dd-yyyy HH:mm")}
              </p>
            </div>
          ))
        ) : (
          <div>
            <GenerateSkeletons count={9} />
          </div>
        )}
      </ScrollArea>
      <div className="w-full mt-12 absolute">
        <p className="text-sm">1-D</p>
        <div className="relative left-10">
          <ErrorBarGraph formAddOn={false} />
        </div>
      </div>
    </SheetContent>
  );
};

export default AggregateErrorSheet;
