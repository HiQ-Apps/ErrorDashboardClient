import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Sheet } from "components/ui/sheet";
import {
  AggregateErrorSheet,
  NamespaceSidebar,
  ErrorDataTable,
  NamespaceTitleCard,
  ParameterSelector,
} from "components/composite";
import { useGetNamespaceByIdQuery } from "features/namespaceApiSlice";
import { useGetErrorMetaGroupedByParamsQuery } from "features/errorApiSlice";
import { selectParams } from "features/aggregateTableSlice";
import { usePageDimensions } from "hooks/usePageDimensions";
import { selectIsOpen } from "features/sidebarSlice";
import { LoadingCard } from "components/base";

const NamespaceDetail = () => {
  const { height } = usePageDimensions();
  const { id } = useParams();
  const params = useSelector(selectParams);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);
  const [groupKey, setGroupKey] = useState("");
  const sidebarIsOpen = useSelector(selectIsOpen);

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  const { isLoading } = useGetNamespaceByIdQuery(id);
  const { data: errorMeta } = useGetErrorMetaGroupedByParamsQuery(
    {
      namespaceId: id,
      groupBy: params.groupBy,
      groupKey: groupKey,
      offset,
      limit,
    },
    { skip: !groupKey }
  );

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <NamespaceSidebar isLoading={isLoading} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "min-w-60" : "min-w-8"
        }`}
      />
      <div className="flex-1 px-4 pb-4">
        {isLoading ? (
          <LoadingCard />
        ) : (
          <>
            <NamespaceTitleCard header="Namespace Details" />
            <div className="my-4">
              <ParameterSelector />
            </div>
            <Sheet>
              {id ? <ErrorDataTable id={id} setGroupKey={setGroupKey} /> : null}
              <AggregateErrorSheet errorMeta={errorMeta} />
            </Sheet>
          </>
        )}
      </div>
    </div>
  );
};

export default NamespaceDetail;
