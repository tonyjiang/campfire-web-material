import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText, Tooltip
} from "@mui/material";
import React from "react";
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictDroppable } from "../StrictDroppable";
import { reorderMemberships } from "../../api/membershipsApi";

export const LeftNavDroppable = (props: {
  draggables: any[];
  user: any;
  setDraggable: React.Dispatch<React.SetStateAction<any[]>>;
  selectedDraggable: any;
  viewDraggable: (draggable: any) => void;
  mobileDrawerToggle: () => void;
  droppableId: string;
  membershipType: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {

  const onDragEndCourses = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const movedDroppable = props.draggables.splice(source.index, 1);
    props.draggables.splice(destination.index, 0, movedDroppable[0]);
    reorderMemberships({
      membershipType: props.membershipType,
      membershipId: movedDroppable[0].membership_id,
      source: source.index,
      destination: destination.index,
      order: destination.index,
      userId: props.user.id
    });
    const reorderedDroppables = props.draggables.map((draggable: any, i) => ({ ...draggable, order: i }));
    props.setDraggable(reorderedDroppables);
  };


  const courseList = (
    <DragDropContext
      onDragEnd={onDragEndCourses}
    >
      <StrictDroppable droppableId={props.droppableId}>
        {(provided: any) => (
          <List
            disablePadding
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {props.draggables.map((draggable: any) => (
              <Draggable
                key={draggable.id}
                draggableId={String(draggable.id)}
                index={draggable.order}>
                {(provided: any) => (
                  <ListItemButton
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    selected={props.selectedDraggable === draggable.id}
                    onClick={() => { props.viewDraggable(draggable); props.mobileDrawerToggle(); }}
                    sx={{ pt: 0.5, pb: 0.5, backgroundColor: { xs: "#353535", sm: "#121212" } }}
                  >
                    <ListItemIcon>
                      {props.icon}
                    </ListItemIcon>
                    <Tooltip title={draggable.title} disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
                      <ListItemText primary={draggable.title} primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} />
                    </Tooltip>
                  </ListItemButton>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </StrictDroppable>
    </DragDropContext>
  );

  return courseList;
};
