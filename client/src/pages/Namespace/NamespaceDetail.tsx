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

const NamespaceDetail = () => {
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
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <NamespaceSidebar />
      </div>
      <div className="flex-1 p-4">
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
