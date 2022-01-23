import React, { useState, useEffect, useCallback, useRef } from "react";
import GqlBoatBrowser from "./components/GqlBoatBrowser";
import BoatRegisterIntro from "./components/boatregisterintro";
import BoatsForSaleIntro from "./components/boatsforsaleintro";
import SmallBoatsIntro from "./components/smallboatsintro";
import { getState, saveState, setView } from "./util/statemanagement";

export default function BrowseApp({ view='app' }) {
  const [state, setState] = useState(getState(view));

  const markedOnly = !!(state.filters && state.filters.oga_nos);
  const markSet = useRef(new Set());

  useEffect(() => { saveState(state, view); }, [state, view]);

  const handlePageSizeChange = (bpp) => {
    setState({...state, page: 1, bpp });
  };

  const handleSortChange = (field, dir) => {
    setState({...state, sort: field, asc: dir === 'asc'});
  };

  const handlePageChange = ({page}) => {
    setState({...state, page });
  };

  const handleFilterChange = useCallback((filters) => {
    setState({...state, page: 1, filters});
  }, [state]);

  const handleMarkedOnlyChange = useCallback((isMarkedOnly) => {
    const markList = [...markSet.current];
    if (isMarkedOnly) {
      handleFilterChange({ ...state.filters, oga_nos: markList });
    } else {
      const { oga_nos, ...f } = state.filters;
      if (oga_nos) {
        handleFilterChange(f);
      }
    }
  }, [state, handleFilterChange]);

  const handleBoatMarked = (ogaNo) => {
    markSet.current.add(ogaNo);
  };

  const handleBoatUnMarked = (ogaNo) => {
    markSet.current.delete(ogaNo);
    if (markedOnly) {
      handleFilterChange({ ...state.filters, oga_nos: [...markSet.current] });
    }
  };

  const BB = ({title, state}) => {
    setView(state.view);
    return (
      <GqlBoatBrowser
        title={title}
        state={state}
        markList={[...markSet.current]}
        onPageSizeChange={handlePageSizeChange}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        onMarkedOnlyChange={handleMarkedOnlyChange}
        isMarkedOnly={markedOnly}
        onBoatMarked={handleBoatMarked}
        onBoatUnMarked={handleBoatUnMarked}
      />
    );
  }

  switch (state.view) {
    case 'sell':
    return (<>
      <BoatsForSaleIntro />
      <BB title="Boats for Sale" state={state} />
    </>);
    case 'small':
    return (
      <>
        <SmallBoatsIntro />
        <BB title="Browse our small boats" state={state} />
      </>
    );
  default:
    return (<>
      <BoatRegisterIntro />
      <BB title="Browse the Register" state={state}/>
      </>);
    }
}
