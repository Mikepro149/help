"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Paperclip, File, Image, X } from "lucide-react";
import { useIsClient } from "@/hooks/use-isomorphic-layout-effect";

export default function TicketChat() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id;
  const isClient = useIsClient();

  const getTickets = () => {
    if (!isClient) return [];
    try {
      const raw = window.localStorage.getItem('boletos_cliente_data');
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('Error loading tickets:', error);
      return [];
    }
  };

  const tickets = getTickets();
  const currentTicket = tickets.find(t => t.id === ticketId);

  if (!currentTicket) {
    return (
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            onClick={() => router.back()}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div className="text-center py-8">
            <p className="text-gray-500">Ticket no encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  // Función para obtener mensajes del localStorage
  const getMessagesFromStorage = () => {
    if (!isClient) return [];
    try {
      const raw = window.localStorage.getItem(`ticket_messages_${ticketId}`);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  };

  // Función para guardar mensajes en localStorage
  const saveMessagesToStorage = (messages) => {
    if (!isClient) return;
    try {
      window.localStorage.setItem(`ticket_messages_${ticketId}`, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  // Mensajes iniciales si no hay mensajes guardados
  const getInitialMessages = () => {
    const savedMessages = getMessagesFromStorage();
    if (savedMessages.length > 0) {
      return savedMessages;
    }
    
    // Si no hay mensajes guardados, crear mensajes iniciales
    return [
      {
        id: 1,
        sender: "Alberto Perez",
        email: "alberto@gmail.com",
        message: "Hola, tengo un problema con mi equipo. No enciende correctamente.",
        timestamp: "04 Enero 2023 15:00 p.m",
        isUser: true
      },
      {
        id: 2,
        sender: "Fernandes - Soporte",
        email: "soporte@empresa.com",
        message: "Hola Alberto, gracias por contactarnos. Vamos a revisar tu equipo paso a paso. ¿Podrías verificar si el cable de alimentación está conectado correctamente?",
        timestamp: "04 Enero 2023 14:00 p.m",
        isUser: false
      }
    ];
  };

  const [messages, setMessages] = React.useState(() => getInitialMessages());
  const [newMessage, setNewMessage] = React.useState("");
  const [attachedFile, setAttachedFile] = React.useState(null);
  const [filePreview, setFilePreview] = React.useState(null);

  // Función para manejar la subida de archivos
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar tamaño (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 10MB.');
        return;
      }

      setAttachedFile(file);
      
      // Crear preview para imágenes
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  // Función para eliminar archivo adjunto
  const handleRemoveFile = () => {
    setAttachedFile(null);
    setFilePreview(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || attachedFile) {
      const message = {
        id: Date.now(), // Usar timestamp como ID único
        sender: "Alberto Perez",
        email: "alberto@gmail.com",
        message: newMessage || "",
        timestamp: new Date().toLocaleString('es-ES'),
        isUser: true,
        attachment: attachedFile ? {
          name: attachedFile.name,
          size: attachedFile.size,
          type: attachedFile.type,
          preview: filePreview
        } : null
      };
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      saveMessagesToStorage(updatedMessages); // Guardar en localStorage
      setNewMessage("");
      setAttachedFile(null);
      setFilePreview(null);
    }
  };

  // Efecto para cargar mensajes cuando cambie el ticketId
  React.useEffect(() => {
    const savedMessages = getMessagesFromStorage();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      // Si no hay mensajes guardados, usar mensajes iniciales
      const initialMessages = getInitialMessages();
      setMessages(initialMessages);
      saveMessagesToStorage(initialMessages); // Guardar mensajes iniciales
    }
  }, [ticketId]);

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Componente para mostrar archivos adjuntos
  const AttachmentDisplay = ({ attachment }) => {
    if (!attachment) return null;

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
      <div className="mt-2 p-2 bg-gray-100 rounded border">
        {attachment.preview ? (
          <div className="space-y-2">
            <img 
              src={attachment.preview} 
              alt={attachment.name}
              className="max-w-48 max-h-32 object-cover rounded"
            />
            <div className="flex items-center text-xs text-gray-600">
              <File className="w-3 h-3 mr-1" />
              <span>{attachment.name} ({formatFileSize(attachment.size)})</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center text-xs text-gray-600">
            <File className="w-4 h-4 mr-2" />
            <span>{attachment.name} ({formatFileSize(attachment.size)})</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => router.back()}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-xl font-bold">Chat de Soporte</h1>
                <p className="text-gray-300">Ticket #{ticketId}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">J&P PERIFERICOS S.A.C.</p>
              <p className="text-xs text-gray-400">Los Olivos</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-[600px]">
            
            {/* Left Column - Ticket Information */}
            <div className="lg:col-span-1 bg-gray-50 p-6 border-r border-gray-200">
              
              {/* Ticket Information */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Información de entradas</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">ID:</span>
                    <span className="ml-2 font-mono">#{currentTicket.id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Motivo:</span>
                    <span className="ml-2">{currentTicket.tipo}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Estado:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getEstadoColor(currentTicket.estado)}`}>
                      {currentTicket.estado}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Departamento:</span>
                    <span className="ml-2">{currentTicket.area}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Fecha de envío:</span>
                    <span className="ml-2">{currentTicket.fecha}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Prioridad:</span>
                    <span className="ml-2">{currentTicket.prioridad}</span>
                  </div>
                </div>
              </div>

              {/* User Pin */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Pin de Usuario</h3>
                </div>
                <div className="bg-white border border-gray-300 rounded-lg p-3">
                  <input 
                    type="text" 
                    value="9876543" 
                    readOnly
                    className="w-full text-center text-lg font-mono bg-transparent border-none outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Chat */}
            <div className="lg:col-span-2 flex flex-col">
              
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Chat</h3>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.isUser 
                        ? 'bg-orange-200 text-gray-800' 
                        : 'bg-blue-100 text-gray-800'
                    }`}>
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                        <div>
                          <p className="text-sm font-medium">{msg.sender}</p>
                          <p className="text-xs text-gray-500">{msg.email}</p>
                        </div>
                      </div>
                      {msg.message && <p className="text-sm mb-1">{msg.message}</p>}
                      {msg.attachment && <AttachmentDisplay attachment={msg.attachment} />}
                      <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                {/* File Preview */}
                {attachedFile && (
                  <div className="mb-3 p-3 bg-gray-100 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {filePreview ? (
                          <Image className="w-4 h-4 mr-2 text-blue-500" />
                        ) : (
                          <File className="w-4 h-4 mr-2 text-gray-500" />
                        )}
                        <span className="text-sm text-gray-700">{attachedFile.name}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(attachedFile.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {filePreview && (
                      <img 
                        src={filePreview} 
                        alt="Preview" 
                        className="mt-2 max-w-32 max-h-20 object-cover rounded"
                      />
                    )}
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <input
                        type="file"
                        accept="*/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <button 
                          type="button"
                          className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
                      </label>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 px-3 py-2 border-none outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-2 text-orange-500 hover:text-orange-600"
                        disabled={!newMessage.trim() && !attachedFile}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
