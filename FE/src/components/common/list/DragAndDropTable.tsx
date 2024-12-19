import { DndContext, DragEndEvent, PointerSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IItineraryElementPayload } from 'service/business/trip/itinerary/ItineraryBusinessStore';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};
export interface IDragAndDropTableOwnProps<T> {
  sortableContextItems: (
    | UniqueIdentifier
    | {
        id: UniqueIdentifier;
      }
  )[];
  tableDataSource: T[];
  tableColumns: ColumnsType<T>;
  setStops: (stops: IItineraryElementPayload[]) => void;
  className?: string;
}

type IDragAndDropTableProps = IDragAndDropTableOwnProps<any>;

const DragAndDropTable: React.FC<IDragAndDropTableProps> = (props: IDragAndDropTableProps) => {
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = props.tableDataSource.findIndex((i) => i.key === active.id);
      const overIndex = props.tableDataSource.findIndex((i) => i.key === over?.id);
      props.setStops(arrayMove(props.tableDataSource, activeIndex, overIndex));
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors} modifiers={[restrictToVerticalAxis]}>
      <SortableContext items={props.sortableContextItems} strategy={verticalListSortingStrategy}>
        <Table
          className={'dragAndDropTable__table ' + (props.className ?? '')}
          components={{
            body: {
              row: Row,
            },
          }}
          rowKey="key"
          columns={props.tableColumns}
          dataSource={props.tableDataSource}
          pagination={false}
        />
      </SortableContext>
    </DndContext>
  );
};

export default DragAndDropTable;
