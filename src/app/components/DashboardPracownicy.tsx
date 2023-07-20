import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Zadanie {
  _id: string;
  Nazwa_zadania: string;
  id_projektu: string;
  OdpowiedzialnaOsoba: string;
  Opis_zadania: string;
  Stan_Zadania: ''|'Do Wykonania' | 'W Trakcie' | 'Wykonane'; // Add any other possible states
}

export default function DashboardPracownicy() {
  const [zadania, setZadania] = useState<Zadanie[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const zadaniaResponse = await fetch('/api/ZadaniaData');
      const zadaniaData = await zadaniaResponse.json();
      setZadania(zadaniaData);
    };

    fetchData();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    // If the draggable was dropped outside a droppable area
    if (!destination) {
      return;
    }

    // If the draggable was dropped back to its original position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Create a copy of the zadania array
    const updatedZadania = Array.from(zadania);

    // Remove the dragged zadanie from the source droppable area
    const draggedZadanie = updatedZadania.splice(source.index, 1)[0];

    // Determine the destination droppable area
    let newStanZadania: ''|'Do Wykonania' | 'W Trakcie' | 'Wykonane' = '';
    if (destination.droppableId === 'doWykonania') {
      newStanZadania = 'Do Wykonania';
    } else if (destination.droppableId === 'wTrakcie') {
      newStanZadania = 'W Trakcie';
    } else if (destination.droppableId === 'wykonane') {
      newStanZadania = 'Wykonane';
    }

    // Insert the dragged zadanie into the destination droppable area
    updatedZadania.splice(destination.index, 0, { ...draggedZadanie, Stan_Zadania: newStanZadania });

    // Update the zadania state
    setZadania(updatedZadania);

    // Send a request to the API to update the Stan_Zadania of the dragged zadanie in the database
    try {
      const response = await fetch('/api/ZadaniaUpdateStan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zadanieId: draggedZadanie._id,
          newStanZadania,
        }),
      });

      if (!response.ok) {
        // Handle the error if the request to the API fails
        console.error('Failed to update Zadanie Stan in the database.');
      }
    } catch (error) {
      console.error('An error occurred while updating Zadanie status:', error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="flex p-3 w-screen justify-center h-screen">
        <div className="w-3/4">
          <p className="text-3xl font-semibold">Panel Zadań</p>
          <p className="text-octonary">Zarządzaj swoimi zadaniami</p>
          <table className="w-full">
            <thead>
              <tr className="flex flex-row justify-evenly border-2">
                <th className="text-center w-1/3">Do wykonania</th>
                <th className="text-center w-1/3">W trakcie</th>
                <th className="text-center w-1/3">Wykonane</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex flex-row justify-evenly bg-septenary">
                {/* First droppable area */}
                <Droppable droppableId="doWykonania" direction="vertical">
                  {(provided) => (
                    <td
                      className="w-1/3 h-screen border-x-2"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div id="Zadanie">
                        {/* Render the draggable elements in "doWykonania" */}
                        {zadania.map((zadanie, index) => {
                          if (zadanie.Stan_Zadania === 'Do Wykonania' && zadanie.OdpowiedzialnaOsoba === session?.user?.name) {
                            return (
                              <Draggable key={zadanie._id} draggableId={zadanie._id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="flex flex-col bg-nonary rounded-md mb-2"
                                  >
                                    {/* Content of the draggable element */}
                                    <div className={`w-full bg-${zadanie.Stan_Zadania === 'Do Wykonania' ? 'secondary' : zadanie.Stan_Zadania === 'W Trakcie' ? 'tertiary' : 'quinary'} h-2 float-right rounded-tr-md rounded-tl-md`}></div>
                                    <div className="p-2">
                                      <p className="font-semibold">{zadanie.Nazwa_zadania}</p>
                                      <p>Identyfikator Projektu: {zadanie.id_projektu}</p>
                                      <p>Odpowiedzialna Osoba: {zadanie.OdpowiedzialnaOsoba}</p>
                                      <p>{zadanie.Opis_zadania}</p>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                        })}
                        {provided.placeholder}
                      </div>
                    </td>
                  )}
                </Droppable>

                {/* Second droppable area */}
                <Droppable droppableId="wTrakcie" direction="vertical">
                  {(provided) => (
                    <td
                      className="w-1/3 h-screen border-x-2"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div id="Zadanie">
                        {/* Render the draggable elements in "wTrakcie" */}
                        {zadania.map((zadanie, index) => {
                          if (zadanie.Stan_Zadania === 'W Trakcie' && zadanie.OdpowiedzialnaOsoba === session?.user?.name) {
                            return (
                              <Draggable key={zadanie._id} draggableId={zadanie._id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="flex flex-col bg-nonary rounded-md mb-2"
                                  >
                                    {/* Content of the draggable element */}
                                    <div className={`w-full bg-${zadanie.Stan_Zadania === 'Do Wykonania' ? 'secondary' : zadanie.Stan_Zadania === 'W Trakcie' ? 'tertiary' : 'quinary'} h-2 float-right rounded-tr-md rounded-tl-md`}></div>
                                    <div className="p-2">
                                      <p className="font-semibold">{zadanie.Nazwa_zadania}</p>
                                      <p>Identyfikator Projektu: {zadanie.id_projektu}</p>
                                      <p>Odpowiedzialna Osoba: {zadanie.OdpowiedzialnaOsoba}</p>
                                      <p>{zadanie.Opis_zadania}</p>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                        })}
                        {provided.placeholder}
                      </div>
                    </td>
                  )}
                </Droppable>

                {/* Third droppable area */}
                <Droppable droppableId="wykonane" direction="vertical">
                  {(provided) => (
                    <td
                      className="w-1/3 h-screen border-x-2"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div id="Zadanie">
                        {/* Render the draggable elements in "wykonane" */}
                        {zadania.map((zadanie, index) => {
                          if (zadanie.Stan_Zadania === 'Wykonane' && zadanie.OdpowiedzialnaOsoba === session?.user?.name) {
                            return (
                              <Draggable key={zadanie._id} draggableId={zadanie._id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="flex flex-col bg-nonary rounded-md mb-2"
                                  >
                                    {/* Content of the draggable element */}
                                    <div className={`w-full bg-${zadanie.Stan_Zadania === 'Do Wykonania' ? 'secondary' : zadanie.Stan_Zadania === 'W Trakcie' ? 'tertiary' : 'quinary'} h-2 float-right rounded-tr-md rounded-tl-md`}></div>
                                    <div className="p-2">
                                      <p className="font-semibold">{zadanie.Nazwa_zadania}</p>
                                      <p>Identyfikator Projektu: {zadanie.id_projektu}</p>
                                      <p>Odpowiedzialna Osoba: {zadanie.OdpowiedzialnaOsoba}</p>
                                      <p>{zadanie.Opis_zadania}</p>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                        })}
                        {provided.placeholder}
                      </div>
                    </td>
                  )}
                </Droppable>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DragDropContext>
  );
}
