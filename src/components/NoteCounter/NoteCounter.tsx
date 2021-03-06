import { FunctionComponent, useState } from 'react';
import Deletable from '../Deletable';
import Note, { NoteProps } from '../Note';
import Counter from './Counter';
import NewCounter, { NewCounterData } from './NewCounter';

type CounterNote = {
  id: number;
  name: string;
  count: number;
};

export type NoteCounterProps = NoteProps & {
  counters: CounterNote[];
  onChange?: (data: Record<string, unknown>) => void;
};

const NoteCounter: FunctionComponent<NoteCounterProps> = ({
  counters = [],
  onChange,
  ...baseNoteProps
}) => {
  const [localCounters, setLocalCounters] = useState(counters);
  const onCounterAdd = ({ name, count }: NewCounterData) => {
    const newCounter: CounterNote = {
      id: localCounters.length,
      name,
      count,
    };
    const newCounters = [...localCounters, newCounter];
    setLocalCounters(newCounters);
    onChange?.({ counters: newCounters });
  };

  const onCounterRemove = (id: number) => {
    const newCounters = localCounters.filter((counter) => counter.id !== id);
    setLocalCounters(newCounters);
    onChange?.({ counters: newCounters });
  };

  const onCounterUpdate = (id: number, count: number) => {
    const newCounters = localCounters.map((counter) => {
      if (counter.id !== id) {
        return counter;
      }
      return {
        ...counter,
        count,
      };
    });
    setLocalCounters(newCounters);
    onChange?.({ counters: newCounters });
  };

  return (
    <Note {...baseNoteProps}>
      {localCounters.map(({ id, name, count }) => (
        <Deletable key={id} onDelete={() => onCounterRemove(id)}>
          <Counter name={name} count={count} onChange={(value) => onCounterUpdate(id, value)} />
        </Deletable>
      ))}

      <NewCounter onCounterAdd={onCounterAdd} />
    </Note>
  );
};

export default NoteCounter;
