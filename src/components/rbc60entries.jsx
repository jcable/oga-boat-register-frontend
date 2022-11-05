import React, { useContext, useState, memo, useRef, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FleetView from './fleetview';
import { useLazyAxios } from 'use-axios-client';
import { TokenContext } from './TokenProvider';

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpandStrings = memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = useRef(null);
    const cellDiv = useRef(null);
    const cellValue = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: 1,
                height: 1,
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value.join(', ')}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, marginLeft: -17 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Grid container>
                            {value.map((s, index) => (
                                <Grid key={index} item xs={12}>
                                    <Typography variant='body2'>{s}</Typography>
                                </Grid>)
                            )}
                        </Grid>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

function renderCellExpandStrings(params) {
    return (
        <GridCellExpandStrings value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

const formatCrewing = (leg) => {
    if (leg.to) {
        return `${leg.from} - ${leg.to}: ${leg.spaces}`;
    }
    return `${leg.from}: ${leg.spaces}`;
};

const GridCellExpandObjects = memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = useRef(null);
    const cellDiv = useRef(null);
    const cellValue = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    if (!value) {
        return '';
    }

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: 1,
                height: 1,
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value.map((leg) => formatCrewing(leg)).join(', ')}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, marginLeft: -17 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>From</TableCell>
                                    <TableCell>To</TableCell>
                                    <TableCell>Spaces</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {value.map((leg, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{leg.from}</TableCell>
                                        <TableCell>{leg.to}</TableCell>
                                        <TableCell>{leg.spaces}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Popper>
            )
            }
        </Box >
    );
});

function renderCellExpandObjects(params) {
    return (
        <GridCellExpandObjects value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

function EntryTable({ rows }) {

    const columns = [
        { field: 'boat', headerName: 'Boat Name', width: 120, valueGetter: (params) => params.row.data.boat.name },
        { field: 'oga_no', headerName: 'OGA No.', width: 80, valueGetter: (params) => params.row.data.boat.oga_no },
        // { field: 'skipper', headerName: 'Skipper', width: 100, valueGetter: (params) => params.row.data.user.name },
        // { field: 'created_at', headerName: 'Submitted', width: 100, valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
        { field: 'data.rbc', headerName: 'Circumnavigating', width: 100, valueGetter: (params) => params.row.data.rbc, valueFormatter: (params) => params.value ? 'Yes' : 'No' },
        {
            field: 'port',
            headerName: 'Ports',
            width: 400,
            valueGetter: (params) => params.row.data.port,
            renderCell: renderCellExpandStrings,
        },
        {
            field: 'leg',
            headerName: 'Crewing Spaces offered per leg',
            width: 300,
            valueGetter: (params) => params.row.data.leg,
            renderCell: renderCellExpandObjects,
        },
        { field: 'data.ecc', headerName: 'EC Cruise', width: 100, valueGetter: (params) => params.row.data.ecc, valueFormatter: (params) => params.value ? 'Yes' : '' },
    ];

    return (<div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                autoHeight={true}
            />
        </div>
    </div>);
}

export default function RBC60Entryies() {
    const name = 'RBC 60';
    const accessToken = useContext(TokenContext);
    const { user, isAuthenticated } = useAuth0();
    const scope = 'member';
    const table = 'entries';
    const [getData, { data, error, loading }] = useLazyAxios({
        url: `https://5li1jytxma.execute-api.eu-west-1.amazonaws.com/default/${scope}/${table}`,
        params: { topic: name },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    useEffect(() => {
        if (isAuthenticated && accessToken && user['https://oga.org.uk/roles'].includes('member')) {
            console.log('have access token');
            getData();
        }
      }, [accessToken, getData, isAuthenticated, user])

    if (loading) {
        console.log('loading');
        return <CircularProgress />
    }

    if (error) {
        console.log(error);
        return (<div>
            Sorry, we had a problem getting the data
        </div>);
    }

    if (!isAuthenticated) {
        return (<Typography>This page is for members only. Please log in to view it.</Typography>);
    }

    const roles = (user && user['https://oga.org.uk/roles']) || [];
    if (!roles.includes('member')) {
        return (<Typography>This page is for members only.</Typography>);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <EntryTable rows={(data && data.Items) || []} />
            </Grid>
            <Grid item xs={12}>
                <FleetView filters={{ name }} />
            </Grid>
        </Grid>
    );
}
