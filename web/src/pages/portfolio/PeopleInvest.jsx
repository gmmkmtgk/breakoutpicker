import { useEffect, useMemo, useState } from 'react';

import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

import MainCard from 'components/MainCard';
import { PeopleInvestProvider, usePeopleInvest } from 'contexts/PeopleInvestContext';

function formatInr(n) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  } catch {
    return `₹${n}`;
  }
}

function pct(n) {
  const s = n > 0 ? '+' : '';
  return `${s}${n?.toFixed?.(1) ?? n}%`;
}

function PeopleInvestInner() {
  const [tab, setTab] = useState(0);
  const [detail, setDetail] = useState(null);
  const [rateOpen, setRateOpen] = useState(null);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');

  const {
    profile,
    discoverManagers,
    subscriptions,
    submitVerification,
    demoApproveVerification,
    demoRejectVerification,
    resetProfileDemo,
    updateMyPortfolio,
    updateMyProfileFields,
    subscribe,
    rateManager,
    isSubscribed,
    getMyRating,
    managers
  } = usePeopleInvest();

  const [vf, setVf] = useState({
    displayName: profile.displayName,
    handle: profile.handle,
    sebiRegNo: profile.sebiRegNo,
    sebiType: profile.sebiType,
    tagline: profile.tagline,
    monthlyFee: String(profile.monthlyFee || 499),
    proofFileName: profile.proofFileName || ''
  });
  const [pf, setPf] = useState(() => ({
    displayName: profile.displayName,
    handle: profile.handle,
    tagline: profile.tagline,
    monthlyFee: String(profile.monthlyFee || 499)
  }));

  const [rows, setRows] = useState(profile.portfolio || []);

  useEffect(() => {
    setRows(profile.portfolio || []);
  }, [profile.portfolio]);

  useEffect(() => {
    setVf({
      displayName: profile.displayName,
      handle: profile.handle,
      sebiRegNo: profile.sebiRegNo,
      sebiType: profile.sebiType,
      tagline: profile.tagline,
      monthlyFee: String(profile.monthlyFee || 499),
      proofFileName: profile.proofFileName || ''
    });
    setPf({
      displayName: profile.displayName,
      handle: profile.handle,
      tagline: profile.tagline,
      monthlyFee: String(profile.monthlyFee || 499)
    });
  }, [
    profile.displayName,
    profile.handle,
    profile.sebiRegNo,
    profile.sebiType,
    profile.tagline,
    profile.monthlyFee,
    profile.proofFileName,
    profile.verificationStatus
  ]);

  const weightSum = useMemo(() => rows.reduce((s, r) => s + (Number(r.weight) || 0), 0), [rows]);

  const openDetail = (m) => {
    setDetail(m);
    const existing = getMyRating(m.id);
    setStars(existing?.stars || 5);
    setComment(existing?.comment || '');
  };

  const closeDetail = () => setDetail(null);

  const handleSubmitVerification = () => {
    submitVerification({
      displayName: vf.displayName.trim(),
      handle: vf.handle.trim().replace(/^@/, ''),
      sebiRegNo: vf.sebiRegNo.trim(),
      sebiType: vf.sebiType,
      tagline: vf.tagline.trim(),
      monthlyFee: Number(vf.monthlyFee) || 499,
      proofFileName: vf.proofFileName || 'registration-proof.pdf'
    });
  };

  const onProof = (e) => {
    const f = e.target.files?.[0];
    setVf((v) => ({ ...v, proofFileName: f ? f.name : '' }));
  };

  const savePortfolio = () => {
    updateMyPortfolio(rows.map((r) => ({ ...r, weight: Number(r.weight) || 0 })));
  };

  const savePublicProfile = () => {
    updateMyProfileFields({
      displayName: pf.displayName.trim(),
      handle: pf.handle.trim().replace(/^@/, ''),
      tagline: pf.tagline.trim(),
      monthlyFee: Number(pf.monthlyFee) || 499
    });
  };

  const addRow = () => {
    setRows((r) => [...r, { symbol: '', name: '', weight: 0 }]);
  };

  const subRows = useMemo(() => {
    return subscriptions.map((s) => ({
      sub: s,
      manager: managers.find((m) => m.id === s.managerId)
    }));
  }, [subscriptions, managers]);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          People Invest
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 920 }}>
          SEBI-registered advisers and research analysts publish model portfolios. After <strong>document verification</strong>, they can
          list holdings and fees. Investors <strong>subscribe with a monthly fee</strong>, track <strong>returns</strong>, and{' '}
          <strong>rate</strong> publishers. This page is a <strong>front-end demo</strong> — wire KYC, payments, and SEBI APIs before
          launch.
        </Typography>
      </Box>

      <Alert severity="warning" variant="outlined">
        Demo only. Reset local demo data anytime:{' '}
        <Button size="small" onClick={resetProfileDemo}>
          Reset demo state
        </Button>
      </Alert>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Discover" icon={<TeamOutlined />} iconPosition="start" sx={{ textTransform: 'none', fontWeight: 700 }} />
        <Tab
          label="Publish portfolio"
          icon={<SafetyCertificateOutlined />}
          iconPosition="start"
          sx={{ textTransform: 'none', fontWeight: 700 }}
        />
        <Tab label="My subscriptions" icon={<CheckCircleOutlined />} iconPosition="start" sx={{ textTransform: 'none', fontWeight: 700 }} />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={2}>
          {discoverManagers.map((m) => (
            <Grid item xs={12} md={6} key={m.id}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  height: '100%',
                  transition: '0.15s',
                  '&:hover': { borderColor: 'primary.light', boxShadow: 2 }
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                  <Box>
                    <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>
                        {m.displayName}
                      </Typography>
                      {m.isYou && <Chip size="small" label="You" color="primary" />}
                      <Chip size="small" icon={<SafetyCertificateOutlined />} label="SEBI verified" color="success" variant="outlined" />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      @{m.handle} · {m.sebiType}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                      {m.sebiRegNo}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                    {formatInr(m.monthlyFee)}
                    <Typography variant="caption" display="block" color="text.secondary" fontWeight={400}>
                      / month
                    </Typography>
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ mt: 1.5 }}>
                  {m.tagline}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mt: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      YTD
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={800} color={m.ytdReturnPct >= 0 ? 'success.main' : 'error.main'}>
                      {pct(m.ytdReturnPct)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      1Y
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={800}>
                      {pct(m.oneYearReturnPct)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Subscribers
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={800}>
                      {m.liveSubscriberCount ?? m.subscriberCount}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Rating
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Rating value={m.avgRating || 0} readOnly precision={0.1} size="small" />
                      <Typography variant="body2" fontWeight={700}>
                        {m.avgRating != null ? m.avgRating : '—'} ({m.ratingCount || 0})
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
                <Button fullWidth variant="outlined" sx={{ mt: 2, textTransform: 'none', fontWeight: 700 }} onClick={() => openDetail(m)}>
                  View portfolio &amp; subscribe
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 1 && (
        <Stack spacing={3}>
          <MainCard title="SEBI registration & verification">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Upload your SEBI certificate / registration proof. In production this runs through automated checks (OCR + registry lookup).
              Here you can simulate <strong>approve</strong> or <strong>reject</strong>.
            </Typography>

            {profile.verificationStatus === 'none' && (
              <Stack spacing={2} sx={{ maxWidth: 560 }}>
                <TextField
                  label="Public display name"
                  value={vf.displayName}
                  onChange={(e) => setVf({ ...vf, displayName: e.target.value })}
                  fullWidth
                  required
                />
                <TextField
                  label="Handle (without @)"
                  value={vf.handle}
                  onChange={(e) => setVf({ ...vf, handle: e.target.value })}
                  fullWidth
                  required
                />
                <TextField
                  label="SEBI registration number"
                  placeholder="e.g. INA000015877"
                  value={vf.sebiRegNo}
                  onChange={(e) => setVf({ ...vf, sebiRegNo: e.target.value })}
                  fullWidth
                  required
                />
                <TextField
                  select
                  label="Registration type"
                  value={vf.sebiType}
                  onChange={(e) => setVf({ ...vf, sebiType: e.target.value })}
                  fullWidth
                >
                  <MenuItem value="Research Analyst">Research Analyst</MenuItem>
                  <MenuItem value="Investment Adviser (Individual)">Investment Adviser (Individual)</MenuItem>
                  <MenuItem value="Investment Adviser (Non-individual)">Investment Adviser (Non-individual)</MenuItem>
                </TextField>
                <TextField
                  label="Strategy headline"
                  value={vf.tagline}
                  onChange={(e) => setVf({ ...vf, tagline: e.target.value })}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label="Monthly subscription (₹)"
                  value={vf.monthlyFee}
                  onChange={(e) => setVf({ ...vf, monthlyFee: e.target.value })}
                  fullWidth
                />
                <Button variant="outlined" component="label">
                  {vf.proofFileName ? `Proof: ${vf.proofFileName}` : 'Upload registration proof (PDF / image)'}
                  <input type="file" accept=".pdf,image/*" hidden onChange={onProof} />
                </Button>
                <Button variant="contained" onClick={handleSubmitVerification} disabled={!vf.displayName || !vf.handle || !vf.sebiRegNo}>
                  Submit for verification
                </Button>
              </Stack>
            )}

            {profile.verificationStatus === 'pending' && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Documents under review. Typical SLA 24–48h. Use demo actions below.
              </Alert>
            )}
            {(profile.verificationStatus === 'pending' || profile.verificationStatus === 'rejected') && (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Button variant="contained" color="success" onClick={demoApproveVerification}>
                  Demo: auto-verify ✓
                </Button>
                <Button variant="outlined" color="error" onClick={demoRejectVerification}>
                  Demo: reject
                </Button>
              </Stack>
            )}

            {profile.verificationStatus === 'rejected' && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {profile.rejectedReason}
              </Alert>
            )}

            {profile.verificationStatus === 'verified' && (
              <Alert severity="success">You are verified. Your listing appears in Discover. Edit portfolio below.</Alert>
            )}
          </MainCard>

          {profile.verificationStatus === 'verified' && (
            <>
              <MainCard title="Your public profile">
                <Stack spacing={2} sx={{ maxWidth: 560 }}>
                  <TextField
                    label="Display name"
                    value={pf.displayName}
                    onChange={(e) => setPf({ ...pf, displayName: e.target.value })}
                    fullWidth
                  />
                  <TextField label="Handle" value={pf.handle} onChange={(e) => setPf({ ...pf, handle: e.target.value })} fullWidth />
                  <TextField
                    label="Headline"
                    value={pf.tagline}
                    onChange={(e) => setPf({ ...pf, tagline: e.target.value })}
                    fullWidth
                    multiline
                    minRows={2}
                  />
                  <TextField
                    label="Monthly fee ₹"
                    value={pf.monthlyFee}
                    onChange={(e) => setPf({ ...pf, monthlyFee: e.target.value })}
                    fullWidth
                  />
                  <Button variant="contained" onClick={savePublicProfile} sx={{ alignSelf: 'flex-start', textTransform: 'none' }}>
                    Save profile
                  </Button>
                </Stack>
              </MainCard>

              <MainCard title="Model portfolio (weights %)">
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Adjust weights; aim for <strong>100%</strong> before saving. Rows are illustrative.
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Symbol</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Weight %</TableCell>
                      <TableCell width={48} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <TextField
                            size="small"
                            value={row.symbol}
                            onChange={(e) =>
                              setRows((rs) => rs.map((x, i) => (i === idx ? { ...x, symbol: e.target.value.toUpperCase() } : x)))
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            fullWidth
                            value={row.name}
                            onChange={(e) => setRows((rs) => rs.map((x, i) => (i === idx ? { ...x, name: e.target.value } : x)))}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            size="small"
                            type="number"
                            value={row.weight}
                            onChange={(e) => setRows((rs) => rs.map((x, i) => (i === idx ? { ...x, weight: e.target.value } : x)))}
                            sx={{ width: 100 }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" onClick={() => setRows((rs) => rs.filter((_, i) => i !== idx))} aria-label="remove">
                            <CloseOutlined />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
                  <Button onClick={addRow} sx={{ textTransform: 'none' }}>
                    Add holding
                  </Button>
                  <Typography variant="body2" color={weightSum === 100 ? 'success.main' : 'warning.main'} fontWeight={700}>
                    Total weight: {weightSum}%
                  </Typography>
                  <Button variant="contained" onClick={savePortfolio} disabled={weightSum !== 100} sx={{ textTransform: 'none' }}>
                    Save portfolio
                  </Button>
                </Stack>
              </MainCard>
            </>
          )}
        </Stack>
      )}

      {tab === 2 && (
        <Stack spacing={2}>
          {!subRows.length && (
            <Typography color="text.secondary">You have no active subscriptions. Discover publishers in the first tab.</Typography>
          )}
          {subRows.map(({ sub, manager }) =>
            manager ? (
              <Paper key={sub.managerId} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1}>
                  <Box>
                    <Typography variant="h6" fontWeight={800}>
                      {manager.displayName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Since {new Date(sub.subscribedAt).toLocaleDateString('en-IN')} · Paid {formatInr(sub.pricePaid)} · {sub.paymentRef}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={() => openDetail(manager)} sx={{ textTransform: 'none' }}>
                      View returns
                    </Button>
                    <Button variant="contained" onClick={() => setRateOpen(manager)} sx={{ textTransform: 'none' }}>
                      Rate
                    </Button>
                  </Stack>
                </Stack>
                <Stack direction="row" gap={3} sx={{ mt: 2 }} flexWrap="wrap">
                  <StatMini label="YTD" v={pct(manager.ytdReturnPct)} pos={manager.ytdReturnPct >= 0} />
                  <StatMini label="1Y" v={pct(manager.oneYearReturnPct)} pos={manager.oneYearReturnPct >= 0} />
                  <StatMini label="Max DD" v={pct(manager.maxDrawdownPct)} pos={false} />
                </Stack>
              </Paper>
            ) : null
          )}
        </Stack>
      )}

      <Dialog open={!!detail} onClose={closeDetail} maxWidth="md" fullWidth scroll="paper">
        {detail && (
          <>
            <DialogTitle sx={{ pr: 6 }}>
              <Stack spacing={0.5}>
                <Typography variant="h5" fontWeight={800}>
                  {detail.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @{detail.handle} · {detail.sebiRegNo} · {detail.sebiType}
                </Typography>
              </Stack>
              <IconButton onClick={closeDetail} sx={{ position: 'absolute', right: 8, top: 8 }} aria-label="close">
                <CloseOutlined />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {detail.tagline}
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    YTD
                  </Typography>
                  <Typography variant="h6" fontWeight={800} color={detail.ytdReturnPct >= 0 ? 'success.main' : 'error.main'}>
                    {pct(detail.ytdReturnPct)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    1Y
                  </Typography>
                  <Typography variant="h6" fontWeight={800}>
                    {pct(detail.oneYearReturnPct)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    Max DD
                  </Typography>
                  <Typography variant="h6" fontWeight={800} color="error.main">
                    {pct(detail.maxDrawdownPct)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    Fee
                  </Typography>
                  <Typography variant="h6" fontWeight={800}>
                    {formatInr(detail.monthlyFee)}/mo
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                Model holdings
              </Typography>
              <Table size="small" sx={{ mb: 3 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detail.portfolio.map((p) => (
                    <TableRow key={p.symbol}>
                      <TableCell>{p.symbol}</TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell align="right">{p.weight}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                Monthly returns (demo %)
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.75}>
                {(detail.monthlyReturnsPct || []).map((v, i) => (
                  <Chip key={i} size="small" label={`M${i + 1}: ${pct(v)}`} color={v >= 0 ? 'success' : 'error'} variant="outlined" />
                ))}
              </Stack>

              {isSubscribed(detail.id) && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" fontWeight={800} gutterBottom>
                    Your rating
                  </Typography>
                  <Rating value={getMyRating(detail.id)?.stars ?? stars} onChange={(_, v) => setStars(v || 0)} />
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              {!detail.isYou && !isSubscribed(detail.id) && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    const ok = subscribe(detail.id, detail.monthlyFee);
                    if (ok) closeDetail();
                  }}
                  sx={{ borderRadius: 99, textTransform: 'none', fontWeight: 800 }}
                >
                  Pay &amp; subscribe ({formatInr(detail.monthlyFee)}/mo)
                </Button>
              )}
              {!detail.isYou && isSubscribed(detail.id) && (
                <Button variant="contained" onClick={() => setRateOpen(detail)} sx={{ textTransform: 'none' }}>
                  Update rating
                </Button>
              )}
              {detail.isYou && (
                <Typography variant="caption" color="text.secondary">
                  This is your listing — subscribers see the same returns view.
                </Typography>
              )}
              <Button onClick={closeDetail} sx={{ textTransform: 'none' }}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={!!rateOpen} onClose={() => setRateOpen(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Rate {rateOpen?.displayName}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Share feedback for other subscribers.
          </Typography>
          <Rating value={stars} onChange={(_, v) => setStars(v || 0)} size="large" sx={{ mb: 2 }} />
          <TextField
            label="Comment (optional)"
            fullWidth
            multiline
            minRows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRateOpen(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (rateOpen) rateManager(rateOpen.id, stars, comment);
              setRateOpen(null);
            }}
          >
            Submit rating
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function StatMini({ label, v, pos }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="subtitle1" fontWeight={800} color={pos ? 'success.main' : 'error.main'}>
        {v}
      </Typography>
    </Box>
  );
}

export default function PeopleInvest() {
  return (
    <PeopleInvestProvider>
      <PeopleInvestInner />
    </PeopleInvestProvider>
  );
}
