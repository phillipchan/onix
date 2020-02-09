import * as React from "react";
import DataGraph from "./DataGraph";
import DataTable from "./DataTable";
import { PageSection, Title } from "@patternfly/react-core";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const MetaModel: React.FunctionComponent<{}> = (props) => {

  const {id} = useParams();
  const models = useSelector(store => store.MetaModelReducer.models);
  const selectedModel = models.find( (model) => model.key === id );

  return (
    <PageSection>
      <Title size="2xl">{selectedModel.name}</Title>
      <DataGraph/>
      <DataTable/>
    </PageSection>);
};

export default MetaModel;
