import { AddSharp as AddSharpIcon, ExpandMore, KeyboardArrowRight, School, Search } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText, Tooltip
} from "@mui/material";
import React from "react";

const FindNewLeftNav = (props: { 
  tooltip: string; 
  paddingTop: any; 
  searchNew: () => void;
  title: string; 
}) => {
  return (
    <Tooltip title={props.tooltip} disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
      <ListItem disablePadding sx={{
        paddingTop: props.paddingTop
      }}>
        <ListItemButton sx={{
          pt: 0.25,
          pb: 0.25
        }} onClick={() => props.searchNew()}>
          <ListItemText primary={props.title} primaryTypographyProps={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }} />
          <Search sx={{
            paddingLeft: 2.5
          }} />
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}

const LeftNavListItems = (props: { 
  openClick: React.MouseEventHandler<HTMLDivElement>; 
  isOpen: boolean; 
  closeString: string; 
  openString: string; 
  itemCategory: string; 
  createNewString: string ; 
  createNew: (arg0: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; 
  mobileDrawerToggle: () => void; 
  itemList: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  topLevelIcon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton sx={{
          pt: 0.5,
          pb: 0.5
        }} onClick={props.openClick}>
          <Tooltip title={
            props.isOpen ? props.closeString : props.openString} disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
            {props.isOpen ? <ExpandMore sx={{
              marginRight: 1
            }} /> : <KeyboardArrowRight sx={{
              marginRight: 1.25,
              marginLeft: -0.25
            }} />}
          </Tooltip>
          {props.topLevelIcon}
          <ListItemText primary={props.itemCategory} />
          <Tooltip title={props.createNewString} onClick={e => {
            props.createNew(e);
            props.mobileDrawerToggle();
          }} disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
            <AddSharpIcon sx={{
              paddingLeft: 2.5
            }} />
          </Tooltip>
        </ListItemButton>
      </ListItem>

      <Collapse in={props.isOpen} timeout="auto" unmountOnExit>
        {props.itemList}
      </Collapse>
    </>
  );
}

export const LeftNavCategory = (props: {
  findNewTooltip: string; 
  paddingTop: any; 
  searchNew: () => void;
  findNewTitle: string; 
  openClick: React.MouseEventHandler<HTMLDivElement>; 
  isOpen: boolean; 
  closeString: string; 
  openString: string; 
  itemCategory: string; 
  createNewString: string ; 
  createNew: (arg0: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; 
  mobileDrawerToggle: () => void; 
  itemList: React.ReactElement<any, string | React.JSXElementConstructor<any>>; 
  hasDivider: boolean;
  topLevelIcon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
  
  let divider = <></>
  if (props.hasDivider) {
    divider = <Divider variant="middle" sx={{ paddingTop: 1 }} />
  }

  return (
    <>
      <FindNewLeftNav
        searchNew={props.searchNew}
        paddingTop={props.paddingTop}
        tooltip={props.findNewTooltip}
        title={props.findNewTitle} 
      />

      <LeftNavListItems
        itemCategory={props.itemCategory}
        createNew={props.createNew}
        openClick={props.openClick}
        mobileDrawerToggle={props.mobileDrawerToggle}
        isOpen={props.isOpen}
        closeString={props.closeString}
        openString={props.openString}
        createNewString={props.createNewString}
        itemList={props.itemList} 
        topLevelIcon={props.topLevelIcon}
      />

      {divider}
    </>
  );
}