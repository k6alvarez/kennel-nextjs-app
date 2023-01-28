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
                html,
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
        {services.map((service) => (
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
              <div dangerouslySetInnerHTML={{ __html: service.description }} />
            )}
          </Collapse.Panel>
        ))}
        <Collapse.Panel header="Exercise" key="1">
          <p>
            Exercise sessions are offered for clients who wish their dog(s) to
            receive more exercise than they would obtain in their 15 foot
            outside kennel run area.
          </p>
          <p>
            An attendant will open the outside kennel gate to give your dog
            access to a large adjoining fenced in area. Your dog can then run
            and play and do what she may.
          </p>
          <p>
            Each dog is given access to the exercise area individually.
            Exceptions will be made only when the owner's make specific
            requests. For example, a client may tell us that her neighbor's dog
            is also being boarded and that the two dogs play together all the
            time. She may then request that we let them do their exercise
            sessions together. We will certainly honor such a request as long as
            it is acceptable to the neighbor. Other exceptions will be made with
            dogs that belong to the same family. Otherwise, under no
            circumstances will strange dogs be allowed into the exercise area
            together.
          </p>
          <p>
            The charge for exercise is $2.00 per 15-minute session. Clients can
            purchase up to three sessions per day.
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/WQkUpeINB4k"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Collapse.Panel>
        <Collapse.Panel header="Playtime" key="2">
          <p>
            Playtime sessions are offered to clients who wish their dog(s) to
            receive extra special human attention while being boarded.
          </p>
          <p>
            Playtime can involve a number of activities such as frisbee, fetch,
            long leisurely nature walks, or caressing and belly rubs. We will
            honor the owner's request of the type of play activity (within
            reason).
          </p>
          <p>
            The charge for playtime is $6.00 per 15-minute session. Clients can
            purchase up to three sessions per day.
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/r-uwhRJ3moM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Collapse.Panel>
        <Collapse.Panel header="Obedience Refresher" key="3">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/oWK4VfD8HeQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p>
            Obedience refresher is offered to clients who are presently
            attending or have completed our obedience training services. We will
            practice all learned commands, emphasizing those that need the most
            work.
          </p>
          <p>
            Clients who have attended our private lessons, boarding school, or
            group classes will benefit greatly by taking advantage of this
            service. Because all trainers use slightly different methods, this
            service is not offered to boarding clients who have not attended, or
            are not presently attending a Gillette Obedience Training program.
            This service is also not offered to dogs that are untrained. If you
            are interested in obedience training your dog please{" "}
            <Link href={"/training"}>
              <a>see our training page</a>
            </Link>
            .
          </p>
          <p>
            Your obedience refresher sessions can be applied to any level of
            training that you have completed or are presently attending.
            Including *puppy, basic, intermediate, and advanced obedience
            training. Obedience refresher can also be applied to Agility for
            clients who are attending or have attended that course.
          </p>
          <p>
            The charge for obedience refresher is $10.00 per 15-minute session.
            Clients can purchase up to three sessions per day.
          </p>
          <BlockQuote>
            <p>
              Puppies six months or older must have attended at least Basic
              Obedience Training to be eligible for obedience refresher.
            </p>
          </BlockQuote>
        </Collapse.Panel>
        <Collapse.Panel header="Pool Time" key="4">
          <p>
            Pool time is offered for water loving breeds during the hot summer
            months. A large plastic wading pool is filled with fresh water
            inside the fenced in exercise area. The dog is then given access to
            the pool for 15 to 20 minutes. This service provides an excellent
            opportunity for additional exercise and playtime for our
            water-loving boarding residents.
          </p>
          <p>
            The charge for Pool Time is $10.00 per session. Clients can purchase
            up to three sessions per day.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="Bedding for Rent" key="5">
          <p>
            We feel that it is an absolute must that dog(s) in our care be
            provided with clean comfortable bedding. Clients who forget to bring
            bedding or prefer not to bring their dog's normal bedding can now
            rent bedding from us. We offer a selection of quality bedding for
            rent at a nominal fee.
          </p>
          <BlockQuote>
            <InfoCircleOutlined />
            <p>
              Bedding Risk:
              <br /> If you think that your dog will chew or destroy bedding we
              recommend that you do not rent! If your dog damages the rented
              bedding you will be charged a replacement fee. We do not presently
              offer bedding for retail sale.
              <br />
              All rental rates are per visit, regardless of length of visit.
            </p>
          </BlockQuote>
          <FlexCards>
            <Card title={<h2>Fleece Beds</h2>}>
              <p>
                Constructed of Sterilon synthetic fleece covering foam rubber
                and polyfill batting. They are soft and comfortable and are an
                excellent choice.
              </p>
              <p>
                Rental: <br /> $5.00
              </p>
              <p>
                Replacement Cost: <br /> $15.00
              </p>
            </Card>

            <Card title={<h2>KEN-L-MAT</h2>}>
              <p>
                These mats are constructed of sturdy cotton fabric and quilted
                to a premium polyester batting. These durable beds are limited
                in supply and therefore rental is subject to availability.
              </p>
              <p>
                Rental: <br /> $5.00
              </p>
              <p>
                Replacement Cost: <br /> $20.00
              </p>
            </Card>
          </FlexCards>

          <p>
            The advantage of kennel provided bedding is that your dog will have
            freshly laundered bedding on a continual basis. The laundry service
            is required for owner provided bedding. Please be sure to read our{" "}
            <Link href="/policies?tab=bedding">
              <a>bedding service</a>
            </Link>{" "}
            if you plan to provide us with your dogs bed.
          </p>
          <BlockQuote>
            <InfoCircleOutlined />
            <p>
              Clients who choose to provide their own bedding will be charged a
              laundry service fee of $1.50 per incident should their dogs soil
              their bedding.
            </p>
          </BlockQuote>
        </Collapse.Panel>
        <Collapse.Panel header="Bath Services" key={6}>
          <FlexCards>
            <Card title={<h2>Bath Services</h2>}>
              <p>
                A bath entails shampooing, rinsing, and drying. We are not
                groomers and do not offer clipping or cutting hair, de-matting,
                flea dips, or de-skunking. A brief brush out is included in the
                cost of a bath. The prices for these services are listed below.
              </p>
              <p>
                Bath: <br /> $25.00
              </p>
              <p>
                Full Brush Out: <br /> $25.00
              </p>
            </Card>
          </FlexCards>
        </Collapse.Panel>
      </Collapse>
    </Content>
  );
};
