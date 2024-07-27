import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Sheet } from "components/ui/sheet";
import { AggregateErrorSheet } from "components/composite";
import {
  NamespaceSidebar,
  ErrorDataTable,
  NamespaceTitleCard,
  ParameterSelector,
} from "components/composite";
import { useGetNamespaceByIdQuery } from "features/namespaceApiSlice";
import { useGetErrorMetaGroupedByParamsQuery } from "features/errorApiSlice";
import { selectParams } from "features/aggregateTableSlice";
import { usePageDimensions } from "hooks/usePageDimensions";

const NamespaceDetail = () => {
  const { height } = usePageDimensions();
  const { id } = useParams();
  const params = useSelector(selectParams);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);
  const [groupKey, setGroupKey] = useState("");

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  const { isLoading } = useGetNamespaceByIdQuery(id);
  const { data: errorMeta } = useGetErrorMetaGroupedByParamsQuery(
    {
      namespace_id: id,
      group_by: params.group_by,
      group_key: groupKey,
      offset,
      limit,
    },
    { skip: !groupKey }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <NamespaceSidebar />
      </div>
      <div className="min-w-52" />
      <div className="flex-1 px-4 pb-4">
        <NamespaceTitleCard header="Namespace Details" />
        <div className="my-4">
          <ParameterSelector />
        </div>
        <Sheet>
          {id ? <ErrorDataTable id={id} setGroupKey={setGroupKey} /> : null}
          <AggregateErrorSheet errorMeta={errorMeta} />
        </Sheet>
      </div>
    </div>
  );
};

export default NamespaceDetail;
