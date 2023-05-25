import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Content } from "../ui-kit/Base";
import { FlexCards } from "./styles";
import { Card, Collapse, message } from "antd";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { InfoCircleOutlined } from "@ant-design/icons";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Tiptap } from "../ui-kit/Tiptap";
import { TitleText } from "../../pages/policies";

export const deleteService = async (id: string): Promise<void> => {
  await fetch(`/api/service/${id}`, {
    method: "DELETE",
  });
};

export const BoardingServices = ({
  editMode,
  content,
  setContent,
  setIsLoading,
  isLoading,
  editorStickyTop,
}) => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Content editorStickyTop={editorStickyTop}>
      {editMode ? (
        <EditForm onSubmit={(e) => e.preventDefault()}>
          <Tiptap
            content={content?.content || { content: "" }}
            onSave={(html) => {
              setContent({ content: html });
              saveContent({
                apiPath: `/api/content-item/${content.id}`,
                payload: { content: html },
                setLoading: setIsLoading,
              });
            }}
            isLoading={isLoading}
          />
        </EditForm>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content?.content }} />
      )}

      <Collapse>
        {services.length > 0 &&
          services.map((service) => (
            <Collapse.Panel
              id={service.name}
              key={service.id}
              header={
                <TitleText>
                  {editMode ? (
                    <>
                      {service.name}
                      <Button
                        onClick={() => {
                          deleteService(service.id).then(() => {
                            message.success("Policy deleted");
                            setServices(
                              services.filter((p) => p.id !== service.id)
                            );
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>{service.name}</>
                  )}
                </TitleText>
              }
            >
              {editMode ? (
                <>
                  <EditForm onSubmit={(e) => e.preventDefault()}>
                    <Tiptap
                      content={service?.description}
                      onSave={(html) => {
                        const body = {
                          ...service,
                          description: html,
                        };
                        fetch(`/api/service/${service.id}`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(body),
                        })
                          .then(() => {
                            message.success("Update successful.");
                          })
                          .catch((err) => console.log(err));
                      }}
                      isLoading={isLoading}
                    />
                  </EditForm>
                </>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              )}
            </Collapse.Panel>
          ))}
      </Collapse>
    </Content>
  );
};
