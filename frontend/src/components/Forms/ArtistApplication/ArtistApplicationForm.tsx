"use client";

import Form from "@/src/components/UI/Form/Form";
import Input from "@/src/components/UI/Inputs/Input";
import Textarea from "@/src/components/UI/TextArea/TextArea";
import {
  ArtistApplicationFormData,
  ArtistApplicationSchema,
} from "@/src/schemas/User/Artist/artistApplication";
import type { CategoryOption } from "@/src/types/Category/categoryTypes";
import styles from "./artist_application.module.css";
import { CategoryCheckboxSelect } from "./CategoryCheckboxSelect";
import { ImageUploader } from "../../UI/ImageUploader/ImageUploader";

type Props = {
  categories: CategoryOption[];
  onSubmitApplication: (data: ArtistApplicationFormData) => Promise<void>;
};

const defaultValues: ArtistApplicationFormData = {
  display_name: "",
  bio: "",
  website_url: "",
  studio_location: "",
  social_links: {
    instagram: "",
    behance: "",
    facebook: "",
    other: "",
  },
  statement: "",
  specialtyIds: [],
  portfolioSamples: [],
};

export function ArtistApplicationForm({
  categories = [],
  onSubmitApplication,
}: Props) {
  return (
    <Form<ArtistApplicationFormData>
      schema={ArtistApplicationSchema}
      defaultValues={defaultValues}
      submitLabel="Invia candidatura"
      className={styles.form}
      onSubmit={async (data) => {
        await onSubmitApplication(data);
      }}
    >
      {(methods) => {
        const {
          register,
          setValue,
          watch,
          formState: { errors },
        } = methods;

        const portfolioFiles = watch("portfolioSamples") ?? [];

        return (
          <div className={styles.formContainer}>
            {/* Informazioni Personali / Studio (Griglia 2 Colonne) */}
            <div className={styles.gridTwoColumns}>
              <Input
                label="Nome d'arte"
                error={errors.display_name?.message}
                {...register("display_name")}
              />

              <Input
                label="Città / Paese dello studio"
                error={errors.studio_location?.message}
                {...register("studio_location")}
              />
            </div>

            <Textarea
              label="Bio"
              rows={3}
              error={errors.bio?.message}
              {...register("bio")}
            />

            {/* Link Esterni e Social (Griglia 3 Colonne) */}
            <div className={styles.gridThreeColumns}>
              <Input
                label="Sito web / portfolio esterno"
                type="url"
                placeholder="https://..."
                error={errors.website_url?.message}
                {...register("website_url")}
              />

              <Input
                label="Instagram"
                type="url"
                placeholder="https://instagram.com/..."
                error={errors.social_links?.instagram?.message}
                {...register("social_links.instagram")}
              />

              <Input
                label="Behance"
                type="url"
                placeholder="https://behance.net/..."
                error={errors.social_links?.behance?.message}
                {...register("social_links.behance")}
              />
            </div>

            {/* Statement Artistico */}
            <Textarea
              label="Statement artistico"
              rows={4}
              error={errors.statement?.message}
              {...register("statement")}
            />

            {/* Selettore Categorie (Full Width) */}
            <CategoryCheckboxSelect
              categories={categories}
              name="specialtyIds"
              label="Specializzazioni"
              error={errors.specialtyIds?.message as string | undefined}
              control={methods.control}
            />

            {/* Uploader Immagini (Full Width) */}
            <ImageUploader
              label="Opere di portfolio (3–5 immagini)"
              value={portfolioFiles}
              onChange={(files) =>
                setValue("portfolioSamples", files, { shouldValidate: true })
              }
              error={errors.portfolioSamples?.message as string | undefined}
              minFiles={3}
              maxFiles={5}
            />
          </div>
        );
      }}
    </Form>
  );
}
