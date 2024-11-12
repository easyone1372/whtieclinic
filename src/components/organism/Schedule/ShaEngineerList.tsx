import { ScrollArea } from '@/components/ui/scroll-area';

type Engineer = {
  engineerId: number;
  engineerName: string;
};

type ShaEngineerListProps = {
  engineerList: Engineer[];
  onClick: (engineerId: number) => void;
};

const ShaEngineerList = ({ engineerList, onClick }: ShaEngineerListProps) => {
  return (
    <div className="w-full h-full">
      <ScrollArea style={{ width: '100%', height: '100%' }}>
        <ul>
          {engineerList.map((engineer) => (
            <li
              key={engineer.engineerId}
              onClick={() => onClick(engineer.engineerId)}
              className="cursor-pointer hover:bg-gray-100"
              style={{ padding: '10px', borderBottom: '1px solid #ddd' }}
            >
              {engineer.engineerName}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default ShaEngineerList;
