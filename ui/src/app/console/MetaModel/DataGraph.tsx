import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Graph } from "react-d3-graph";
import axios from "axios";

import { ACTIONS } from "./data/metamodelDatalReducer";

const DataGraph: React.FunctionComponent<{}> = () => {
  const dispatch = useDispatch();

  const [graphData, setGraphData] = useState<{
    nodes: string[];
    links: string[];
  }>({nodes: [], links: []});

  const graphConfig = {
    "automaticRearrangeAfterDropNode": false,
    "collapsible": false,
    "directed": true,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "height": 500,
    "highlightDegree": 1,
    "highlightOpacity": 1,
    "linkHighlightBehavior": false,
    "maxZoom": 8,
    "minZoom": 0.1,
    "nodeHighlightBehavior": true,
    "panAndZoom": false,
    "staticGraph": false,
    "staticGraphWithDragAndDrop": false,
    "width": 1000,
    "d3": {
      "alphaTarget": 0.05,
      "gravity": -200,
      "linkLength": 100,
      "linkStrength": 1
    },
    "node": {
      "color": "red",
      "fontColor": "black",
      "fontSize": 12,
      "fontWeight": "normal",
      "highlightColor": "yellow",
      "highlightFontSize": 12,
      "highlightFontWeight": "bold",
      "highlightStrokeColor": "SAME",
      "highlightStrokeWidth": "SAME",
      "labelProperty": "name",
      "mouseCursor": "pointer",
      "opacity": 1,
      "renderLabel": true,
      "size": 300,
      "strokeColor": "blue",
      "strokeWidth": 1.5,
      "svg": "",
      "symbolType": "circle"
    },
    "link": {
      "color": "grey",
      "fontColor": "black",
      "fontSize": 8,
      "fontWeight": "normal",
      "highlightColor": "#d3d3d3",
      "highlightFontSize": 8,
      "highlightFontWeight": "normal",
      "labelProperty": "name",
      "mouseCursor": "pointer",
      "opacity": 1,
      "renderLabel": false,
      "semanticStrokeWidth": false,
      "strokeWidth": 2,
      "markerHeight": 6,
      "markerWidth": 6
    }
  };

// graph event callbacks
  const onClickGraph = function () {
    window.alert(`Clicked the graph background`);
  };

  const onClickNode = (nodeId) => {
    console.log("!!!!!!!!!!!", nodeId);
    dispatch({type: ACTIONS.SET_NODE, node: nodeId});
  };

  const onDoubleClickNode = (nodeId: string) => {
  };

  const onRightClickNode = (event: MouseEvent, nodeId: string) => {
  };

  const onMouseOverNode = (nodeId: string) => {
  };

  const onMouseOutNode = (nodeId: string) => {
  };

  const onClickLink = (source: string, target: string) => {
  };

  const onRightClickLink = (event: MouseEvent, source: string, target: string) => {
  };

  const onMouseOverLink = (source: string, target: string) => {
  };

  const onMouseOutLink = (source: string, target: string) => {
  };

  const onNodePositionChange = (nodeId: string, x: number, y: number) => {
  };

  const {id} = useParams();

  useEffect(() => {
    axios.get(`/api/model/${id}/data`
    ).then(response => {
        const itemTypes: any[] = [];
        response.data.itemTypes.forEach((item, idx) => {
          if (item.root) {
            item.symbolType = "square";
            item.color = "orange";
            item.fontWeight = "bold";
          }
          itemTypes.push({id: item.key, ...item});
        });

        const linkRules: any[] = [];
        response.data.linkRules.forEach((item, idx) => {
          linkRules.push({source: item.startItemTypeKey, target: item.endItemTypeKey});
        });

        setGraphData({nodes: itemTypes, links: linkRules});
      }
    ).catch(error => console.error(error));
  }, [id]);

  if (graphData.nodes.length > 0) {
    return (
      <>
        <Graph
          id="metaModel" // id is mandatory, if no id is defined rd3g will throw an error
          data={graphData}
          config={graphConfig}
          onClickNode={onClickNode}
          onDoubleClickNode={onDoubleClickNode}
          onRightClickNode={onRightClickNode}
          onClickGraph={onClickGraph}
          onClickLink={onClickLink}
          onRightClickLink={onRightClickLink}
          onMouseOverNode={onMouseOverNode}
          onMouseOutNode={onMouseOutNode}
          onMouseOverLink={onMouseOverLink}
          onMouseOutLink={onMouseOutLink}
          onNodePositionChange={onNodePositionChange}
        />
      </>
    );
  }

  return (
    <h1>Loading</h1>
  );
};

export default DataGraph;
