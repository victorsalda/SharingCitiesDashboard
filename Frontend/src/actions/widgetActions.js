import axios from "axios";
import _ from 'lodash'
import {
  PURGE_EDITOR,
  SET_MAP_DATA,
  SET_MAP_PROPERTY,
  SET_PLOT_DATA,
  SET_PLOT_ENCODING,
  SET_PLOT_PROPERTY,
  SET_WIDGET_PROPERTY,
  SAVE_WIDGET_FULFILLED,
  SAVE_WIDGET_REJECTED,
  LOAD_WIDGET_FULFILLED,
  LOAD_WIDGET_REJECTED,
  TOGGLE_MAP_TOOLTIP_FIELD,
} from "./../constants";
import {FETCH_ADMIN_FULFILLED, FETCH_ADMIN_REJECTED} from "../constants";

/**
 * Simply returns true if a record object contains both "Latitude" and "Longitude" fields
 *
 * @param record
 * @returns {boolean}
 */
const isMappable = (record={}) => {
  const requiredKeys = ['Latitude', 'Longitude'];
  const presentKeys = Object.keys(record);

  for (let rk of requiredKeys) {
    if (!presentKeys.includes(rk)) return false;
  }

  return true
};

/**
 * Applies default values as defined in ./../../fcc.config.js
 *
 * @returns {Function}
 */
export const initializeEditor = () => {
  return (dispatch, getState) => {
    const currentState = getState();
    const defaults = currentState.config.config.widgetEditorDefaults;
    const data = currentState.api.data;

    dispatch({
      type: SET_MAP_DATA,
      payload: data,
    });

    dispatch({
      type: SET_MAP_PROPERTY,
      payload: {
        property: 'center',
        value: defaults.mapCenter,
      },
    });

    dispatch({
      type: SET_MAP_PROPERTY,
      payload: {
        property: 'markerAttribute',
        value: defaults.mapMarkerAttribute,
      },
    });

    dispatch({
      type: SET_MAP_PROPERTY,
      payload: {
        property: 'markerColor',
        value: defaults.mapMarkerColor,
      },
    });

    dispatch({
      type: SET_MAP_PROPERTY,
      payload: {
        property: 'markerRadius',
        value: defaults.mapMarkerRadius,
      },
    });

    dispatch({
      type: SET_MAP_PROPERTY,
      payload: {
        property: 'tileLayer',
        value: defaults.mapTileLayer,
      },
    });

    dispatch({
      type: SET_MAP_PROPERTY,
      payload: {
        property: 'showHeatmap',
        value: defaults.mapShowHeatmap,
      },
    });

    dispatch({
      type: SET_MAP_PROPERTY,
      payload: {
        property: 'zoom',
        value: defaults.mapZoom,
      },
    });

    dispatch({
      type: SET_PLOT_DATA,
      payload: data,
    });

    dispatch({
      type: SET_PLOT_PROPERTY,
      payload: {
        property: "mark",
        value: defaults.plotMarker,
      },
    });

    dispatch({
      type: SET_WIDGET_PROPERTY,
      payload: {
        property: 'isMappable',
        value: isMappable(data[0]),
      },
    });

    dispatch({
      type: SET_WIDGET_PROPERTY,
      payload: {
        property: 'name',
        value: defaults.widgetName,
      },
    });

    dispatch({
      type: SET_WIDGET_PROPERTY,
      payload: {
        property: 'type',
        value: defaults.widgetType,
      },
    });
  }
};

export const purgeEditor = () => ({
  type: PURGE_EDITOR,
});

export const setMapData = (data=[]) => ({
  type: SET_MAP_DATA,
  payload: data,
});

export const setMapProperty = (property, value) => ({
  type: SET_MAP_PROPERTY,
  payload: {
    property,
    value,
  },
});

export const setPlotData = (data=[]) => ({
  type: SET_PLOT_DATA,
  payload: data,
});

export const setPlotEncoding = (encoding) => ({
  type: SET_PLOT_ENCODING,
  payload: encoding,
});

export const setPlotProperty = (property, value) => ({
  type: SET_PLOT_PROPERTY,
  payload: {
    property,
    value,
  },
});

export const setWidgetProperty = (property, value) => ({
  type: SET_WIDGET_PROPERTY,
  payload: {
    property,
    value,
  },
});

export const toggleMapTooltipField = (field, checked) => ({
  type: TOGGLE_MAP_TOOLTIP_FIELD,
  payload: {
    field,
    checked,
  },
});

export function saveWidget() {
  return (dispatch, getState) => {
    const currentState = getState();
    const config = currentState.config.config;

    const widgetName = _.get(currentState, 'widget.name' )
    const widgetType = _.get(currentState, 'widget.type')
    let widgetConfig = null
    if (widgetType === 'plot') {
      widgetConfig = _.get(currentState, 'widget.plotConfig' )
    } else if (widgetType === 'map') {
      widgetConfig = _.get(currentState, 'widget.mapConfig' )
    } else {
      widgetConfig = _.get(currentState, 'widget.alertConfig' )
    }

    axios({
      url: config.apiRoot + 'widgets',
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTA1MDUzNTgsIm5iZiI6MTU1MDUwNTM1OCwianRpIjoiZDA4ZGRiNGQtNDE4YS00YWMwLWFkODYtZDQ3ZGM0ZTUyYTQ4IiwiZXhwIjoxNTUxMTEwMTU4LCJpZGVudGl0eSI6InBhdHJpY2tAZG90bW9kdXMuY29tIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsiYWRtaW4iOm51bGx9fQ.N_fD7BGjnRL47YFoclmIBnoWzub2ugDJUSNuLwRA0B4'
      },
      data: {
        ...widgetConfig,
        "title": widgetName,
        "type": widgetType
      }
    })
      .then((response) => {
        dispatch({
          type: SAVE_WIDGET_FULFILLED,
          payload: response.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: SAVE_WIDGET_REJECTED,
          payload: err,
        })
    })
  }
}