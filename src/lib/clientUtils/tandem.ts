export const getFacilities = async (app: Autodesk.Tandem.DtApp) => {
    const facilities: Autodesk.Tandem.DtFacility[] = await app.getCurrentTeamsFacilities();
    return facilities;
}

export const getViews = async (app: Autodesk.Tandem.DtApp, facility: Autodesk.Tandem.DtFacility) => {
    const views = await app.views.fetchFacilityViews(facility);
    return views;
}

export async function loadFacility(
    app: Autodesk.Tandem.DtApp,
    viewer: Autodesk.Viewing.GuiViewer3D,
    facility: Autodesk.Tandem.DtFacility,
    view: Autodesk.Tandem.CompactView
) {
    let models = undefined;
    if (view) {
        models = new Set<string>(view?.facets?.filters?.models);
    }
    await app.displayFacility(facility, models, viewer);
    if (view) {
        await facility.goToView(view);
    }
}

export async function loadView(
    app: Autodesk.Tandem.DtApp,
    facility: Autodesk.Tandem.DtFacility,
    view: Autodesk.Tandem.CompactView
) {
    await app.views.setCurrentView(facility, view);
}