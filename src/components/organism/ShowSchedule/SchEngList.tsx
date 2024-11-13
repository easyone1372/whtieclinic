import { ScrollArea } from '@/components/ui/scroll-area';
import { SchEngListType } from '@/constants/LJW/ShowSchTypes';

const SchEngList = ({ engineerList, onClick }: SchEngListType) => {
  return (
    <div className="w-full h-full">
      <ScrollArea style={{ width: '100%', height: '100%' }}>
        <ul>
          {engineerList.map((eng) => (
            <li
              key={eng.engineer_id}
              onClick={() => onClick(eng.engineer_id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              {eng.engineer_name}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default SchEngList;
