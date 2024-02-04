import { writable } from "svelte/store";
import {
  getFacilities,
  getViews,
  loadFacility,
  loadView,
} from "$lib/clientUtils/tandem";

export type AutodeskContext = {
  app: Autodesk.Tandem.DtApp | null;
  viewer: Autodesk.Viewing.GuiViewer3D | null;
  facilities: Autodesk.Tandem.DtFacility[];
  facility: Autodesk.Tandem.DtFacility | null;
  views: Autodesk.Tandem.CompactView[];
  selectedView: Autodesk.Tandem.CompactView | null;
};

export const initialAutodeskContext: AutodeskContext = {
  app: null,
  viewer: null,
  facilities: [],
  facility: null,
  views: [],
  selectedView: null,
};
function createAutodeskContext() {
  const { subscribe, set, update } = writable(initialAutodeskContext);

  return {
    subscribe,
    appInitialized: async (
      app: Autodesk.Tandem.DtApp,
      viewer: Autodesk.Viewing.GuiViewer3D,
    ) => {
      const facilities = await getFacilities(app);
      const facility = facilities[0];
      const views = await getViews(app, facility);
      const defaultView = views.find((view) => view.default);
      const selectedView = defaultView || views[0];
      await loadFacility(app, viewer, facility, selectedView);
      update((data) => ({
        ...data,
        app,
        viewer,
        facilities,
        facility,
        views,
        selectedView,
      }));
    },
    updateFacility: async (
      facility: Autodesk.Tandem.DtFacility,
      viewer: Autodesk.Viewing.GuiViewer3D,
    ) => {
      const views = await getViews(facility.app, facility);
      const defaultView = views.find((view) => view.default);
      const selectedView = defaultView || views[0];
      await loadFacility(facility.app, viewer, facility, selectedView);
      update((data) => ({ ...data, facility, views, selectedView }));
    },
    updateViews: (views: Autodesk.Tandem.CompactView[]) =>
      update((data) => ({ ...data, views })),
    updateView: async (
      facility: Autodesk.Tandem.DtFacility,
      selectedView: Autodesk.Tandem.CompactView,
    ) => {
      await loadView(facility.app, facility, selectedView);
      update((data) => ({ ...data, selectedView }));
    },
    reset: () => set(initialAutodeskContext),
  };
}

export default createAutodeskContext();
