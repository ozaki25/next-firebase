import { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
} from '@material-ui/core';
import { Item } from '../../interfaces';

const defaultItem = {
  title: '',
  url: '',
  flag1: false,
  flag2: false,
};

export default function NewItem() {
  const [item, setItem] = useState<Item>(defaultItem);

  const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const onChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name as keyof Item;
    setItem({ ...item, [key]: !item[key] });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ item });
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    alert(`success!${JSON.stringify(item)}`);
    setItem(defaultItem);
  };
  return (
    <>
      <Head>
        <title>New Item</title>
      </Head>
      <Container component="main" maxWidth="sm">
        <Paper>
          <Box p={2}>
            <form onSubmit={onSubmit}>
              <FormGroup>
                <TextField
                  id="title"
                  name="title"
                  value={item.title}
                  label="タイトル"
                  onChange={onChangeText}
                  fullWidth
                  required
                />
                <TextField
                  id="url"
                  name="url"
                  value={item.url}
                  label="URL"
                  onChange={onChangeText}
                  fullWidth
                  required
                />
                <FormControlLabel
                  label="フラグ1"
                  control={
                    <Checkbox
                      id="flag1"
                      name="flag1"
                      checked={item.flag1}
                      onChange={onChangeRadio}
                    />
                  }
                />
                <FormControlLabel
                  label="フラグ2"
                  control={
                    <Checkbox
                      id="flag2"
                      name="flag2"
                      checked={item.flag2}
                      onChange={onChangeRadio}
                    />
                  }
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                作成
              </Button>
            </form>
          </Box>
        </Paper>
        <Link href="/" passHref>
          <Button>一覧へ</Button>
        </Link>
      </Container>
    </>
  );
}
