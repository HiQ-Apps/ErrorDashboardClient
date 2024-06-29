import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

import { ScrollArea } from "components/ui/scroll-area";
import { selectTimeZone } from "features/timezoneSlice";
import { StatusDot } from "components/base";
import { SheetContent, SheetHeader, SheetTitle } from "components/ui/sheet";
import type { ErrorMetaData } from "types/Error";
import { GenerateSkeletons } from "shared/utils/generateSkeletons";

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
    <SheetContent className="w-120" aria-describedby="Error Data">
      <SheetHeader>
        <SheetTitle>Error Data</SheetTitle>
      </SheetHeader>
      <ScrollArea className="h-80 w-full rounded-md border dark:text-slate-200">
        {errorMeta ? (
          errorMeta.map((error) => (
            <div
              className="text-2xs flex flex-row justify-around items-center space-x-4"
              key={error.id}
            >
              <p
                onClick={() => {
                  handleNavigateToErrorDetailPage(error.id);
                }}
                className="w-[220px] hover:underline hover:decoration-default cursor-pointer flex text-center"
              >
                {error.id}
              </p>
              <StatusDot status={error.resolved} />
              <p className="flex text-center">
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
        <div className="relative left-10">
          {/* <ErrorBarGraph formAddOn={false} /> */}
        </div>
      </div>
    </SheetContent>
  );
};

export default AggregateErrorSheet;
