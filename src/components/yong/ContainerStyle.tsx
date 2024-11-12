import styled from '@emotion/styled';

export const StyledCalendarContainer = styled.div`
  .rbc-calendar {
    max-width: 1400px !important;
    margin: 0 auto;
    height: 700px !important;
    width: 100% !important;
  }
  .rbc-event {
    background-color: #3174ad !important;
    padding: 4px !important;
    font-size: 0.9em !important;
  }
  .rbc-event-content {
    text-align: center;
  }
  .rbc-row-segment {
    padding: 2px 4px !important;
  }
  .rbc-toolbar {
    margin-bottom: 20px;
  }
  .rbc-toolbar button {
    color: #333;
  }
  .rbc-active {
    background-color: #3174ad !important;
    color: white !important;
  }
  .rbc-today {
    background-color: #f0f7ff;
  }
`;